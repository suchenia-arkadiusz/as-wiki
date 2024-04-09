import { createUser } from './helpers/upsertUser';
import bcrypt from 'bcryptjs';
import { generateJWT } from './utils/generateJWT';

export const registerUser = async (req, res) => {
  const { username, password, email, firstName, lastName, avatarUrl, userGroup } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 12);

  const savedUser = await createUser({ username, password: encryptedPassword, email, firstName, lastName, avatarUrl }, userGroup);
  if (!savedUser) return res.status(500).send({ message: 'Cannot create user' });

  const user = { id: savedUser.id, username, email, firstName, lastName, avatarUrl, userGroups: savedUser.userGroups };

  const token = generateJWT(user);
  const refreshToken = generateJWT(user, '7d');

  res.status(200).send({ user, jwt: token, refreshToken });
};
