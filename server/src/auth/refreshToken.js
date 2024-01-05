import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { generateJWT } from "./utils/generateJWT";

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) return res.status(401).send();

  try {
    const decoded = jwt.verify(refreshToken, config.tokenSecret);
    const accessToken = generateJWT({ ...decoded.user });

    res
      .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict", secure: true })
      .cookie("jwt", accessToken, { httpOnly: true, sameSite: "strict", secure: true })
      .header("authorization", accessToken)
      .send(decoded.user);
  } catch (err) {
    return res.status(401).send();
  }
};
