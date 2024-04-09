import {getUserByUsername} from './helpers/getUser';

export const checkToken = async (req, res) => {
  const user = await getUserByUsername(req.user.username);
  const { password: _, ...responseUser } = user;
  return res.status(200).send({ user: responseUser });
};
