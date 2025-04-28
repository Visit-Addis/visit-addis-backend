import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { logError } from "../utils/index.js";
import { roles } from "../configs/constants.js";
import {
  format,
  isEmailUsed,
  verifyPassword,
  verifyEmail,
  isUserNameUsed,
} from "./plugin.js";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    profiileImage: {
      type: String,
    },
    favorite: {
      attractions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attraction",
        },
      ],
      events: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
      ],
      restaurants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Restaurant",
        },
      ],
    },
    role: {
      type: String,
      enum: roles,
      default: roles[0],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isOAuthUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    logError(error);
    next(error);
  }
});

userSchema.plugin(format, "toJSON");
userSchema.plugin(format, "toObject");
userSchema.plugin(isEmailUsed);
userSchema.plugin(verifyPassword);
userSchema.plugin(verifyEmail);
userSchema.plugin(isUserNameUsed);

const User = mongoose.model("User", userSchema);
export default User;
