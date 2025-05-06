import mongoose from "mongoose";
import { format } from "./plugin.js";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "itemId is required"],
    },
    category: {
      type: String,
      enum: ["attraction", "event", "restaurant"],
      required: [true, "category is required"],
    },
    comment: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);
reviewSchema.plugin(format, "toJSON");
reviewSchema.plugin(format, "toObject");
const Review = mongoose.model("Review", reviewSchema);
export default Review;
