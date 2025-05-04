import { Restaurant } from "../models/index.js";
import { CustomError } from "../utils/index.js";

const getRestaurants = async () => {
  const restaurants = await Restaurant.find(
    {},
    "id name images location"
  ).populate({ path: "images", select: "url" });
  if (!restaurants) {
    throw new CustomError(400, "No Restaurant found", true);
  }
  return restaurants;
};

const getRestaurantDetails = async (id) => {
  const restaurant = await Restaurant.findById(id)
    .select("id name location images averageRating contact reviews")
    .populate({ path: "images", select: "url" })
    .populate({ path: "reviews", select: "userId rating comment" });
  if (!restaurant) {
    throw new CustomError(404, "This restaurant is not found", true);
  }
  return restaurant;
};

const searchRestaurants = async (filters) => {
  const query = {};
  const textSearchConditions = [];
  if (filters.averageRating) {
    query.averageRating = { $gte: parseFloat(filters.averageRating) };
    delete filters.averageRating;
  }
  for (const key in filters) {
    textSearchConditions.push({
      [key]: { $regex: filters[key], $options: "i" },
    });
  }
  if (textSearchConditions.length > 0) {
    query.$or = textSearchConditions;
  }
  const restaurants = await Restaurant.find(query, "id name location");
  return restaurants;
};

const postRestaurant = async (data) => {
  const restaurants = await Restaurant.create(data);
  if (!restaurants) {
    throw new CustomError(400, "post restaurant failed", true);
  }
  return restaurants;
};

const deleteRestaurant = async (id) => {
  const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
  if (!deletedRestaurant) {
    throw new CustomError(400, "Restaurant deletion failed", true);
  }
  return "restaurant deleted successfully";
};

const updateRestaurant = async (id, data) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    throw new CustomError(404, "No  restaurant found with this Id", true);
  }
  if (data.images) {
    restaurant.images.push(data.images);
    delete data.images;
  }
  if (data.menu) {
    restaurant.menu.push(data.menu);
    delete data.menu;
  }

  Object.keys(data).forEach((key) => {
    restaurant[key] = data[key];
  });
  const updatedRestaurant = await restaurant.save();
  if (!updatedRestaurant) {
    throw new CustomError(400, "restaurant update failed", true);
  }
  return "restaurant updated successfully ";
};

export default {
  getRestaurants,
  getRestaurantDetails,
  searchRestaurants,
  deleteRestaurant,
  postRestaurant,
  updateRestaurant,
};
