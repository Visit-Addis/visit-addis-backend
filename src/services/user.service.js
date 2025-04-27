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

export default { getUserByEmail, getUserById };
