import mongoose from "mongoose";
import { format } from "./plugin.js";
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
    contact: {
      type: String,
      required: [true, "contact is required"],
      trim: true,
    },
    priceRange: {
      type: String,
      required: [true, "priceRange is required"],
    },
    menu: {
      type: String,
      required: [true, "menu is required"],
      //not implemented yet
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
restaurantSchema.plugin(format, "toObject");
restaurantSchema.plugin(format, "toJSON");
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
