import { DateTime } from "luxon";
import { handleCatchError } from "../utils/index.js";
import { authService } from "../services/index.js";
import { CustomError } from "../utils/index.js";
import { envVar } from "../configs/env.vars.js";
import { tokenTypes } from "../configs/constants.js";
import passport from "../configs/passport.js";

const register = handleCatchError(async (req, res) => {
  const { email, password } = req.body;
  const { message, userId } = await authService.register(email, password);
  res.status(201).json({ message: message, userid: userId });
});

const login = handleCatchError(async (req, res) => {
  const { email, password } = req.body;
  const { message, token } = await authService.loginUser(email, password);
  res.status(200).json({ message: message, token: token });
});

const acceptPasswordResetRequest = handleCatchError(async (req, res) => {
  const { email } = req.body;
  const { message } = await authService.acceptPasswordResetRequest(email);
  res.status(200).json({ message: message });
});

const sentResetPasswordForm = handleCatchError(async (req, res) => {
  const token = req.query.token;
  const htmlResetForm = authService.sentResetPasswordForm(token);
  res.status(200).send(htmlResetForm);
});

const resetPassword = handleCatchError(async (req, res) => {
  const { token, newPassword } = req.body;
  const message = await authService.resetPassword(token, newPassword);
  res.status(200).send(message);
});

const handleGoogleAuthSuccess = (req, res) => {
  const token = tokenService.generateToken(
    req.user.id,
    req.user.role,
    tokenTypes.ACCESS,
    DateTime.now().plus({ minutes: envVar.token.acessTokenExp })
  );
  res.status(200).send(token);
};

const handleGoogleAuthError = (req, res, next) => {
  return next(new CustomError(400, "Google authentication failed", true));
};

const initiateGoogleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const handleGoogleAuthCallback = passport.authenticate("google", {
  failureRedirect: `${envVar.serverUrl}/api/v1/auth/login`,
  session: true,
});

export default {
  register,
  login,
  acceptPasswordResetRequest,
  sentResetPasswordForm,
  resetPassword,
  initiateGoogleAuth,
  handleGoogleAuthCallback,
  handleGoogleAuthSuccess,
  handleGoogleAuthError,
};
