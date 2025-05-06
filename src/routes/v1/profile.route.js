import express from "express";
import { auth, upload } from "../../middlewares/index.js";
import { profileController } from "../../controllers/index.js";

const Router = express.Router();

Router.route("/")
  .get(auth.isAuthenticated, profileController.getMyProfile)
  .put(
    auth.isAuthenticated,
    auth.isAuthorizedTo("manage-profile"),
    upload.single("image"),
    profileController.updateMyProfile
  );

Router.route("/favorite").post(
  auth.isAuthenticated,
  auth.isAuthorizedTo("favorite"),
  profileController.addMyFavorite
);
export default Router;
