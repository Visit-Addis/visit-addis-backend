import { restaurantService, reviewService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

const getRestaurants = handleCatchError(async (req, res) => {
  const restaurants = await restaurantService.getAllRestaurants();
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
  const message = await restaurantService.postRestaurant(req.body);
  res.status(201).json(message);
});

const deleteRestaurant = handleCatchError(async (req, res) => {
  const id = req.params.id;
  const message = await restaurantService.deleteRestaurant(id);
  res.status(200).json(message);
});

const updateRestaurant = handleCatchError(async (req, res) => {
  const id = req.params.id;
  const message = await restaurantService.updateRestaurant(id, req.body);
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
