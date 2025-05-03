import { CustomError } from "../utils/index.js";

const calculateAvgRatings = async (
  currentAvgRating,
  numberOfRatings,
  newRating
) => {
  if (currentAvgRating === 0) {
    return newRating;
  }
  const avgRating =
    (currentAvgRating * numberOfRatings + newRating) / (numberOfRatings + 1);
  return avgRating;
};

const addReview = async (model, itemId, reviewId, newRating) => {
  const item = await model.findById(itemId);
  if (!item) {
    throw new CustomError(400, "No Item found with this Id", true);
  }

  const currentAvg = Number(item.averageRating) || 0;
  const currentCount = Number(item.numberOfRatings) || 0;
  const newRate = Number(newRating) || 0;

  item.reviews.push(reviewId);
  item.averageRating = await calculateAvgRatings(
    currentAvg,
    currentCount,
    newRate
  );
  item.numberOfRatings = currentCount + 1;

  const review = await item.save();
  return review;
};

export default addReview;
