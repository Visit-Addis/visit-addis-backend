import express from "express";
import { restaurantController } from "../../controllers/index.js";

const Router = express.Router();
Router.route("/")
  .get(restaurantController.getRestaurants)
  .post(restaurantController.postRestaurant);
Router.route("/:d")
  .get(restaurantController.getRestaurantDetails)
  .put(restaurantController.updateRestaurant)
  .delete(restaurantController.deleteRestaurant);
Router.route("/res/search").get(restaurantController.searchRestaurants);
Router.route("/rev/review").post(restaurantController.postReview);

export default Router;
