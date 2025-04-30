import express from "express";
import { attractionController } from "../../controllers/index.js";
const Router = express.Router();

Router.route("/").get(attractionController.getAttractions);
Router.route("/:id").get(attractionController.getAttractionDetail);
Router.route("/search").get(attractionController.searchAttractions);

export default Router;
