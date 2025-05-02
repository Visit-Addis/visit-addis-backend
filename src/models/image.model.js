import mongoose from "mongoose";
import { format } from "./plugin.js";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

imageSchema.plugin(format, "toJSON");
imageSchema.plugin(format, "toObject");

const Image = mongoose.model("Image", imageSchema);
export default Image;
