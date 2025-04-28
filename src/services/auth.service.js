import { DateTime } from "luxon";
import { User } from "../models/index.js";
import { CustomError } from "../utils/index.js";
import userService from "./user.service.js";
import tokenService from "./token.service.js";
import emailService from "./email.service.js";
import {
  createResetPassworForm,
  createResetSuccessMessage,
} from "../configs/html.js";
import { envVar } from "../configs/env.vars.js";
import { tokenTypes } from "../configs/constants.js";

const registerUser = async (userData) => {
  const { userName, email } = userData;
  const { isUserNameUsed, isEmailUsed } = await Promise.all([
    User.isUserNameUsed(userName),
    User.isEmailUsed(email),
  ]);
  if (isUserNameUsed) {
    throw new CustomError(400, "user name already exists", true);
  }
  if (isEmailUsed) {
    throw new CustomError(400, "email already exists", true);
  }
  const user = await User.createUser(userData);
  if (!user) {
    throw new CustomError(400, "user creation failed", true);
  }
  return { message: "user registered successfully", userId: user.id };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(400, "Incorrect Email or Password");
  }
  if (await user.isOAuthUser()) {
    throw new CustomError(403, "please login with your google acount", true);
  }
  if (!user.verifyPassword(password)) {
    throw new CustomError(400, "Incorrect Email or Password", true);
  }
  const accessToken = tokenService.generateToken(
    user.id,
    user.role,
    tokenTypes.ACCESS,
    DateTime.now().plus({ minutes: envVar.token.acessTokenExp })
  );
  return { message: "login successfully", token: accessToken };
};

const acceptPasswordResetRequest = async (email) => {
  const user = await userService.getUserByEmail(email);
  const token = await tokenService.generateResetToken(user.id, user.role);
  await emailService.sendResetPasswordLink(email, token);
  return { message: "Reset password link sent to your email" };
};

const sentResetPasswordForm = async (token) => {
  const resetLink = `${envVar.serverUrl}/api/v1/auth/reset-password`;
  const decodedToken = tokenService.verifyToken(token);
  const user = await User.findById(decodedToken.sub);
  if (!user) {
    throw new CustomError(400, "invalid token", true);
  }
  const newToken = await tokenService.generateResetToken(user.id, user.role);
  const resetPasswordForm = createResetPassworForm(resetLink, newToken);
  return resetPasswordForm;
};

const resetPassword = async (token, newPassword) => {
  const decodedToken = tokenService.verifyToken(token);
  const user = await User.findById(decodedToken.sub);
  if (!user) {
    throw new CustomError(400, "invalid token", true);
  }
  const isMatch = await user.verifyPassword(newPassword);
  if (isMatch) {
    throw new CustomError(
      400,
      "new password should be different from old password",
      true
    );
  }
  user.password = newPassword;
  await user.save();
  const message = createResetSuccessMessage(envVar.serverUrl);
  return message;
};

export default {
  registerUser,
  loginUser,
  acceptPasswordResetRequest,
  sentResetPasswordForm,
  resetPassword,
};
