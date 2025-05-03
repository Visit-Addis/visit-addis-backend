import express from "express";
import { attractionController } from "../../controllers/index.js";
import { upload, auth } from "../../middlewares/index.js";

const Router = express.Router();

Router.route("/")
  .get(attractionController.getAttractions)
  .post(
    auth.isAuthenticated,
    auth.isAuthorizedTo("manage-items"),
    upload.single("image"),
    attractionController.postAttraction
  );

Router.route("/:id")
  .get(auth.isAuthenticated, attractionController.getAttractionDetail)
  .put(
    auth.isAuthenticated,
    auth.isAuthorizedTo("manage-items"),
    upload.single("image"),
    attractionController.updateAttraction
  )
  .delete(
    auth.isAuthenticated,
    auth.isAuthorizedTo("manage-items"),
    attractionController.deleteAttraction
  );

Router.route("/att/search").get(attractionController.searchAttractions);
Router.route("/rev/review").post(
  auth.isAuthenticated,
  auth.isAuthorizedTo("review"),
  attractionController.postReview
);

export default Router;
