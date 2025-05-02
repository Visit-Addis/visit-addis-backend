import { restaurantService } from "../services/index.js";


const getRestaurants = async (req, res) => {
  const restaurants = await restaurantService.getAllRestaurants();
  res.status(200).json(restaurants);
};

const getRestaurantById = async (req, res) => {
  const { id } = req.params;
  const restaurant = await restaurantService.getRestaurantById(id);
  res.status(200).json(restaurant);
};

const filterRestaurants = async (req, res) => {
  const filters = req.query;
  const restaurants = await restaurantService.filterRestaurants(filters);
  res.status(200).json(restaurants);
};

export default {
  getRestaurants,
  getRestaurantById,
  filterRestaurants,
};
