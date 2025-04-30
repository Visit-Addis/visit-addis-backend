import mongoose from "mongoose";
import { category } from "../configs/constants.js";
import { format } from "./plugin.js";

const attractionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Attraction name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Attraction description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Attraction category is required"],
      enum: category.attractions,
    },
    location: {
      type: String,
      required: [true, "Attraction location is required"],
      trim: true,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    ticketPrice: {
      type: Number,
      required: [true, "Attraction ticket price is required"],
    },
    hoursOfOperation: {
      type: String,
      required: [true, "Attraction hours of operation are required"],
    },
  },
  { timestamps: true }
);

attractionSchema.plugin(format, "toJSON");
attractionSchema.plugin(format, "toObject");

const Attraction = mongoose.model("Attraction", attractionSchema);

export default Attraction;
