import express from "express";
import { restaurantController } from "../../controllers/index.js";
import { upload } from "../../middlewares/index.js";

const Router = express.Router();

Router.route("/")
  .get(restaurantController.getRestaurants)
  .post(upload.single("image"), restaurantController.postRestaurant);

Router.route("/:d")
  .get(restaurantController.getRestaurantDetails)
  .put(upload.single("image"), restaurantController.updateRestaurant)
  .delete(restaurantController.deleteRestaurant);

Router.route("/res/search").get(restaurantController.searchRestaurants);
Router.route("/rev/review").post(restaurantController.postReview);

export default Router;
