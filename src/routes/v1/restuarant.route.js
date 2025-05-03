import express from "express";
import { restaurantController } from "../../controllers/index.js";
import { upload, auth } from "../../middlewares/index.js";

const Router = express.Router();

Router.route("/")
  .get(restaurantController.getRestaurants)
  .post(
    auth.isAuthenticated,
    auth.isAuthorizedTo("manage-items"),
    upload.single("image"),
    restaurantController.postRestaurant
  );

Router.route("/:d")
  .get(auth.isAuthenticated, restaurantController.getRestaurantDetails)
  .put(
    auth.isAuthenticated,
    auth.isAuthorizedTo("manage-items"),
    upload.single("image"),
    restaurantController.updateRestaurant
  )
  .delete(
    auth.isAuthenticated,
    auth.isAuthorizedTo("manage-items"),
    restaurantController.deleteRestaurant
  );

Router.route("/res/search").get(restaurantController.searchRestaurants);
Router.route("/rev/review").post(
  auth.isAuthorizedTo("review"),
  restaurantController.postReview
);

export default Router;
