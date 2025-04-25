import mongoose from "mongoose";
import { category } from "../configs/constants.js";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
    time: {
      type: String,
      required: [true, "time is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
      trim: true,
    },
    organizer: {
      type: String,
      required: [true, "organizer is required"],
    },
    category: {
      type: String,
      enum: category.events,
      required: [true, "category is required"],
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
