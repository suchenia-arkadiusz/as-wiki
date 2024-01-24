import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { generateJWT } from './utils/generateJWT';

export const refreshToken = (req, res) => {
  const refreshToken = req.headers['refresh-token'];
  if (!refreshToken) return res.status(401).send();

  try {
    const decoded = jwt.verify(refreshToken, config.tokenSecret);
    const accessToken = generateJWT({ ...decoded.user });

    res.send({ user: decoded.user, jwt: accessToken, refreshToken });
  } catch (err) {
    return res.status(401).send();
  }
};
