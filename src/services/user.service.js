import { User } from "../models/index.js";
import { CustomError } from "../utils/index.js";

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError(404, "user not found", true);
  }
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(404, "user not found", true);
  }
  return user;
};

const getMyProfile = async (userId) => {
  const profile = await User.findById(userId)
    .select("userName email favorite profileImage role")
    .populate("favorite.attractions", "name")
    .populate("favorite.events", "name")
    .populate("favorite.restaurants", "name");
  if (!profile) {
    throw new CustomError(404, "profile not found", true);
  }

  return profile;
};

const updateProfile = async (userId, userData) => {
  const profile = await User.findById(userId);
  if (!profile) {
    throw new CustomError(404, "User profile not found", true);
  }
  const allowedFields = ["userName", "email", "profileImage"];
  Object.keys(userData).forEach((key) => {
    if (allowedFields.includes(key)) {
      profile[key] = userData[key];
    }
  });
  const updatedProfile = await profile.save();
  return "Your profile updated successfully";
};

const addFavorite = async (userId, favorite) => {
  const profile = await User.findById(userId);
  if (!profile) {
    throw new CustomError(404, "User profile not found", true);
  }

  const allowedFields = ["attractions", "restaurants", "events"];

  for (const key of allowedFields) {
    if (favorite[key]) {
      const currentSet = new Set(
        profile.favorite[key].map((id) => id.toString())
      );
      const newItems = Array.isArray(favorite[key])
        ? favorite[key]
        : [favorite[key]];

      newItems.forEach((item) => {
        const itemId = item.toString();
        if (!currentSet.has(itemId)) {
          profile.favorite[key].push(item);
        }
      });
    }
  }

  await profile.save();
  return "Item(s) added to your favorite.";
};

export default {
  getUserByEmail,
  getUserById,
  updateProfile,
  getMyProfile,
  addFavorite,
};
