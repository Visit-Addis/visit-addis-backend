import { CustomError } from "../utils/index.js";
import userService from "./user.service.js";

const calaculateAvgRatings = async (
  currentAvgRating,
  totalRating,
  userRating
) => {};

const addReview = async (model, userId, itemId, reviewId) => {
  const item = await model.findById(itemId);
  if (!item) {
    throw new CustomError(400, "No Item found with this Id", true);
  }
  const user = await userService.getUserById(userId);
  item.reviews.push(reviewId);
  const review = await item.save();
  return review;
};

export default addReview;
