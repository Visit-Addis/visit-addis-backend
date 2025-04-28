import jwt from "jsonwebtoken";
import { DateTime } from "luxon";
import { envVar } from "../configs/env.vars.js";
import { CustomError } from "../utils/index.js";
import { tokenTypes } from "../configs/constants.js";

const { sign, verify } = jwt;

const generateToken = (userId, userRole, tokenType, expiresIn) => {
  const payload = {
    sub: userId,
    role: userRole,
    type: tokenType,
    iat: DateTime.now().toUnixInteger(),
    expiresIn: expiresIn,
  };
  return sign(payload, envVar.token.jwtSecret);
};
const generateResetToken = async (userId, userRole) => {
  const tokenType = tokenTypes.resetPassword;
  const expiresIn = DateTime.now().plus({
    seconds: envVar.token.resetPasswordToknExp,
  });
  const resetToken = generateToken(userId, userRole, tokenType, expiresIn);
  return resetToken;
};

const verifyToken = (token) => {
  const decoded = verify(token, envVar.token.jwtSecret);
  if (!decoded) {
    throw new CustomError(403, "Unauthorized - Invalid token.", true);
  }
  return decoded;
};

export default { generateToken, generateResetToken, verifyToken };
