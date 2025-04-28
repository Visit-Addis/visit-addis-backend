import express from "express";
import { authController } from "../../controllers/index.js";
const Router = express.Router();
Router.route("/register").post(authController.register);
Router.route("/login").post(authController.login);
Router.route("/password-reset-request").post(
  authController.acceptPasswordResetRequest
);
Router.route("/password-reset-form").get(authController.sentResetPasswordForm);
Router.route("/reset-password").post(authController.resetPassword);
Router.route("/google").post(authController.initiateGoogleAuth);
Router.route("/google/callback").get(
  authController.handleGoogleAuthCallback,
  authController.handleGoogleAuthSuccess,
  authController.handleGoogleAuthError
);
export default Router;
