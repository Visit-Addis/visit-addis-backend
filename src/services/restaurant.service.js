import { Restaurant } from "../models/index.js";
import { CustomError } from "../utils/index.js";

const getAllRestaurants = async () => {
  const restaurants = await Restaurant.find();
  return restaurants;
};

const getRestaurantById = async (id) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    throw new CustomError(404, "Restaurant not found", true);
  }
  return restaurant;
};

const filterRestaurants = async (filters) => {
  const query = {};
  if (filters.location) {
    query.location = filters.location;
  }
  if (filters.priceRange) {
    query.priceRange = filters.priceRange;
  }
  const restaurants = await Restaurant.find(query);
  return restaurants;
};

export default {
  getAllRestaurants,
  getRestaurantById,
  filterRestaurants,
};
