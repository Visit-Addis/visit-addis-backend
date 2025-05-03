import express from "express";
import { eventController } from "../../controllers/index.js";
import { upload, auth } from "../../middlewares/index.js";

const Router = express.Router();

Router.route("/")
  .post(
    auth.isAuthenticated,
    auth.isAuthorizedTo("manage-items"),
    upload.single("image"),
    eventController.postEvent
  )
  .get(eventController.getEvents);

Router.route("/:id")
  .get(auth.isAuthenticated, eventController.getRestaurantDetails)
  .put(
    auth.isAuthenticated,
    auth.isAuthorizedTo("manage-items"),
    upload.single("image"),
    eventController.updateEvent
  )
  .delete(
    auth.isAuthenticated,
    auth.isAuthorizedTo("manage-items"),
    eventController.deleteEvent
  );

Router.route("/ev/search").get(eventController.searchEvents);
Router.route("/rev/review").post(
  auth.isAuthenticated,
  auth.isAuthorizedTo("review"),
  eventController.postReview
);

export default Router;
