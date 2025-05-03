import mongoose from "mongoose";
import { format } from "./plugin.js";
import { category } from "../configs/constants.js";
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "location is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: category.restaurants,
      required: [true, "category is required"],
    },
    contact: {
      type: String,
      required: [true, "contact is required"],
      trim: true,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    priceRange: {
      type: String,
    },
    menu: {
      type: [String], // have  Changed to an array of strings
      //not implemented yet
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);
restaurantSchema.plugin(format, "toObject");
restaurantSchema.plugin(format, "toJSON");
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
