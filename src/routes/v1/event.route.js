import express from "express";
import { eventController } from "../../controllers/index.js";
import { upload } from "../../middlewares/index.js";

const Router = express.Router();

Router.route("/")
  .post(upload.single("image"), eventController.postEvent)
  .get(eventController.getEvents);

Router.route("/:id")
  .get(eventController.getRestaurantDetails)
  .put(upload.single("image"), eventController.updateEvent)
  .delete(eventController.deleteEvent);

Router.route("/att/search").get(eventController.searchEvents);
Router.route("/rev/reviews").post(eventController.postReview);

export default Router;
