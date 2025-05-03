import { userService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

const getMyProfile = handleCatchError(async (req, res) => {
  const profile = req.user.id;
});
