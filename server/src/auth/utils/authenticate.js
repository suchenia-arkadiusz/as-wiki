import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { generateJWT } from "./generateJWT";

export const authenticate = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) return res.status(401).send();

  try {
    req.user = jwt.verify(accessToken.split(" ")[1], config.tokenSecret)?.user;
    next();
  } catch (err) {
    if (!refreshToken) return res.status(401).send();

    try {
      const decoded = jwt.verify(refreshToken, config.tokenSecret);
      const token = generateJWT({ ...decoded.user });

      req.user = decoded.user;
      res
        .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict", secure: true })
        .cookie("jwt", token, { httpOnly: true, sameSite: "strict", secure: true })
        .header("authorization", token);
      next();
    } catch (err) {
      return res.status(400).send();
    }
  }
};
