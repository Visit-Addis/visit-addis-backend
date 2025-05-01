import express from "express";
import { attractionController } from "../../controllers/index.js";
const Router = express.Router();
Router.route("/")
  .get(attractionController.getAttractions)
  .post(attractionController.postAttraction);
Router.route("/:id")
  .get(attractionController.getAttractionDetail)
  .put(attractionController.updateAttraction)
  .delete(attractionController.deleteAttraction);
Router.route("/search").get(attractionController.searchAttractions);

export default Router;
