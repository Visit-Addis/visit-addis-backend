import { reviewService, userService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";
import { updloadAndSaveImge } from "./util.js";

const getMyProfile = handleCatchError(async (req, res) => {
  const userId = req.user.id;
  const profile = await userService.getMyProfile(userId);
  res.status(200).json(profile);
});

const updateMyProfile = handleCatchError(async (req, res) => {
  const userId = req.user.id;
  const userData = await updloadAndSaveImge(req, "profile");
  const message = await userService.updateProfile(userId, userData);
  res.status(201).json(message);
});

const addMyFavorite = handleCatchError(async (req, res) => {
  const userId = req.user.id;
  const message = await userService.addfavorite(userId, req.body);
  res.status(201).json(message);
});

export default { getMyProfile, updateMyProfile, addMyFavorite };
