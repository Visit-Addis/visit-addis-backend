import { restaurantService, reviewService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";
import { updloadAndSaveImge } from "./util.js";

const getRestaurants = handleCatchError(async (req, res) => {
  const restaurants = await restaurantService.getRestaurants();
  res.status(200).json(restaurants);
});

const getRestaurantDetails = handleCatchError(async (req, res) => {
  const { id } = req.params;
  const restaurant = await restaurantService.getRestaurantDetails(id);
  res.status(200).json(restaurant);
});

const searchRestaurants = handleCatchError(async (req, res) => {
  const filters = req.query;
  const restaurants = await restaurantService.searchRestaurants(filters);
  res.status(200).json(restaurants);
});

const postRestaurant = handleCatchError(async (req, res) => {
  const restaurantData = await updloadAndSaveImge(req, "restaurants");
  const message = await restaurantService.postRestaurant(restaurantData);
  res.status(201).json(message);
});

const deleteRestaurant = handleCatchError(async (req, res) => {
  const id = req.params.id;
  const message = await restaurantService.deleteRestaurant(id);
  res.status(200).json(message);
});

const updateRestaurant = handleCatchError(async (req, res) => {
  const id = req.params.id;
  const restaurantData = await updloadAndSaveImge(req, "restaurants");
  const message = await restaurantService.updateRestaurant(id, restaurantData);
  res.status(202).json(message);
});

const postReview = handleCatchError(async (req, res) => {
  req.body.category = "restaurant";
  req.body.userId = req.user.Id;
  const message = await reviewService.postReview(req.body);
  res.status(200).json(message);
});

export default {
  getRestaurants,
  getRestaurantDetails,
  searchRestaurants,
  postRestaurant,
  deleteRestaurant,
  updateRestaurant,
  postReview,
};
