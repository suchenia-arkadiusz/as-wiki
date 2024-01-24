import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

export const generateJWT = ({ id, username, email, firstName, lastName, userGroups }, expiresIn = '1h') =>
  jwt.sign({ user: { id, username, email, firstName, lastName, userGroups } }, config.tokenSecret, {
    expiresIn,
  });
