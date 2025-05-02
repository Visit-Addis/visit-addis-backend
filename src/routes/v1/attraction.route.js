import express from "express";
import { attractionController } from "../../controllers/index.js";
import { upload } from "../../middlewares/index.js";

const Router = express.Router();

Router.route("/")
  .get(attractionController.getAttractions)
  .post(upload.single("image"), attractionController.postAttraction);

Router.route("/:id")
  .get(attractionController.getAttractionDetail)
  .put(upload.single("image"), attractionController.updateAttraction)
  .delete(attractionController.deleteAttraction);

Router.route("/att/search").get(attractionController.searchAttractions);
Router.route("/rev/review").post(attractionController.postReview);

export default Router;
