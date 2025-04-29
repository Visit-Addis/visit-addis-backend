import { tokenService, userService } from "../services/index.js";
import { roles, roleRights } from "../configs/constants.js";
import { CustomError } from "../utils";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = tokenService.verifyToken(token);
    req.user = await userService.getUserById(decoded.sub);
    next();
  } catch (error) {
    next(error);
  }
};

const isAuthorized =
  (...rights) =>
  async (req, res, next) => {
    const message =
      "You are not authorized to access this endpoint. Please log in or create an account.";
    try {
      if (!req.user) {
        throw new CustomError(403, message, true);
      }
      const userRights = roleRights.get(req.user.role) || [];
      const hasRight = rights.every((right) => userRights.includes(right));
      if (!hasRight) {
        throw new CustomError(
          403,
          "You are not authorized to access this site.",
          true
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default { isAuthenticated, isAuthorized };
