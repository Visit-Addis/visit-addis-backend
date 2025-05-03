import mongoose from "mongoose";
import { Review, Event, Restaurant, Attraction } from "../models/index.js";
import { CustomError } from "../utils/index.js";
import addReview from "./util.js";

const postReview = async (userReview) => {
  const { itemId, category, rating } = userReview;
  userReview.itemId = new mongoose.Types.ObjectId(itemId);
  const review = await Review.create(userReview);
  const reviewId = review.id;
  let successMessagee = null;
  switch (category) {
    case "event":
      await addReview(Event, itemId, reviewId, rating);
      successMessagee = "Review added successfully";
      break;
    case "attraction":
      await addReview(Attraction, itemId, reviewId, rating);
      successMessagee = "Review added successfully";
      break;
    case "restaurant":
      await addReview(Restaurant, itemId, reviewId, rating);
      successMessagee = "Review added successfully";
      break;
    default:
      throw new CustomError(400, `No category found${category}`, true);
  }
  return successMessagee;
};

const deleteReview = async (id) => {
  const deletedReview = await Review.findByIdAndDelete(id);
  if (!deletedReview) {
    throw new CustomError(400, "no Review found with this id");
  }
  return " review deleted successfully";
};

const updateReview = async (id, data) => {
  const review = await Review.findById(id);
  Object.keys(data).forEach((key) => {
    review[key] = data[key];
  });
  await review.save();
  return "review updated successfully";
};

const getReviews = async () => {
  const reveiws = await Review.find({});
  return reveiws;
};

export default { postReview, deleteReview, getReviews, updateReview };
