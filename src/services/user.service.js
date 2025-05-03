import { User } from "../models/index.js";
import { CustomError } from "../utils/index.js";

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError(400, "user not found", true);
  }
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(400, "user not found", true);
  }
  return user;
};

const getMyProfile = async (userId) => {
  const profile = await User.findById(userId)
    .select("id userName email favorite profileImage")
    .populate({
      path: "favorite.attraction",
      select: "name",
    })
    .populate({
      path: "favorite.",
      select: "name",
    });
  return profile;
};
const upadateProfile = async (userId, userData) => {};
const addfavorite = (userId) => {};

export default { getUserByEmail, getUserById };
