import jwt from "jsonwebtoken";
import {config} from "../../config/config";
import {generateJWT} from "./generate-jwt";

export const authenticate = (req, res, next) => {
  const accessToken = req.headers["Authorization"]
  const refreshToken = req.cookies["refreshToken"]

  if (!accessToken && !refreshToken)
    return res.status(401).send()

  try {
    req.user = jwt.verify(accessToken, config.tokenSecret)
    next()
  } catch (err) {
    if (!refreshToken)
      return res.status(401).send()

    try {
      const decoded = jwt.verify(refreshToken, config.tokenSecret)
      const accessToken = generateJWT({...decoded.user})

      res
        .cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: "strict"})
        .header("Authorization", accessToken)
        .send(decoded.user)
    } catch (err) {
      return res.status(400).send()
    }
  }
}
