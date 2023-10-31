import jwt from "jsonwebtoken";
import { config } from "../../config/config";

export const generateJWT = ({ userId, username, email, firstName, lastName }, expiresIn = "1h") =>
  jwt.sign({ user: { userId, username, email, firstName, lastName } }, config.tokenSecret, {
    expiresIn,
  });
