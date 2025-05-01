import { Review, Event, Restaurant, Attraction } from "../models/index.js";
import { CustomError } from "../utils/index.js";
import addReview from "./util.js";

const postReview = async (userReview) => {
  const { userId, itemId, category } = userReview;
  const review = await Review.create(userReview);
  const reviewId = review.id;
  let isReviewAdded = false;
  switch (category) {
    case "event":
      await addReview(Event, itemId, userId, reviewId);
    case "attraction":
      await addReview(Attraction, itemId, userId, reviewId);
    case "restaurant":
      await addReview(Restaurant, itemId, userId, reviewId);
    default:
      throw new CustomError(400, `No category found${category}`, true);
  }
  if (isReviewAdded) {
    return "Review added successfully";
  }
};

const deleteReview = async () => {};

const updateReview = async () => {};

const getReviews = async () => {};

export default { postReview, deleteReview, getReviews, updateReview };
