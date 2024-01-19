import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { log } from "../../config/logger";

export const authenticate = (req, res, next) => {
  const accessToken = req.headers["authorization"];

  if (!accessToken) return res.status(401).send();

  try {
    req.user = jwt.verify(accessToken.split(" ")[1], config.tokenSecret)?.user;
    next();
  } catch (err) {
    log.warn({ err }, "Error during access token validation");
    res.status(401).send();
  }
};
