import { handleCatchError } from "../utils/index.js";
import { authService } from "../services/index.js";

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

export default {
  register,
  login,
  acceptPasswordResetRequest,
  sentResetPasswordForm,
  resetPassword,
};
