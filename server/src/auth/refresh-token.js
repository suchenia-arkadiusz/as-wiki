import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { generateJWT } from "./utils/generate-jwt";

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) return res.status(401).send();

  try {
    const decoded = jwt.verify(refreshToken, config.tokenSecret);
    const accessToken = generateJWT({ ...decoded.user });

    res.header("Authorization", accessToken).send(decoded.user);
  } catch (err) {
    return res.status(400).send();
  }
};
