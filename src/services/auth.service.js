import { User } from "../models/index.js";
import { CustomError } from "../utils/index.js";
import userService from "./user.service.js";

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
  return user;
};

const loginUSer = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(400, "Incorrect Email or Password");
  }
  if (!user.verifyPassword) {
    throw new CustomError(400, "Incorrect Email or Password");
  }
  return { message: "login successfully", token: "" };
};

const acceptPasswordResetRequest = async (email) => {
  const user = await userService.getUserByEmail(email);
};
const sentResetPasswordForm = async () => {};
const resetPassword = async (newPassword) => {};

export default {
  registerUser,
  loginUSer,
  acceptPasswordResetRequest,
  sentResetPasswordForm,
  resetPassword,
};
