import mongoose from "mongoose";
import { category } from "../configs/constants.js";

const eventSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
      default: () => `event-${Math.random().toString(36).substring(2, 9)}`
    },
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
    reviews: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Review" 
    }],
  },
  { 
    timestamps: true,
    _id: true // This ensures our custom _id is used
  }
);

// Add text index for search functionality
eventSchema.index({
  name: 'text',
  description: 'text',
  location: 'text'
});

// ✅ Prevent OverwriteModelError during hot reload
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
