import {updateExistingUser} from './helpers/updateExistingUser';
import bcrypt from 'bcryptjs';
import {getUserByUsername} from '../auth/helpers/getUser';

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, firstName, lastName, avatarUrl, newPassword } = req.body;

  const encryptedPassword = newPassword ? await bcrypt.hash(newPassword, 12) : undefined;

  const isUpdated = await updateExistingUser(id, email, firstName, lastName, avatarUrl, encryptedPassword);

  if (isUpdated) {
    const { password: _, ...updatedUser } = await getUserByUsername(username);

    return res.status(200).send(updatedUser);
  }

  return res.status(500).send({ message: 'Cannot update user' });
};
