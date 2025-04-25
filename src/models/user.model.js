import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { logError } from "../utils/index.js";
import { roles } from "../configs/constants.js";
const userSchema = new mongoose.Schema(
  {
    name: {
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
      required: [true, "Password is required"],
    },
    profiileImage: {
      type: String,
    },
    favorite: {
      type: [String],
      default: [],
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

const User = mongoose.model("User", userSchema);
export default User;
