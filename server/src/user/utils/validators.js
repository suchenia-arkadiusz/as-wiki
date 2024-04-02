import Joi from 'joi';
import {log} from '../../config/logger';
import {getUserByUsername} from '../../auth/helpers/getUser';
import bcrypt from 'bcryptjs';

export const validateUpdateUserInput = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().allow(null, ''),
    lastName: Joi.string().allow(null, ''),
    avatarUrl: Joi.string().allow(null, ''),
    newPassword: Joi.string().allow(null, ''),
    currentPassword: Joi.string().allow(null,'')
  });

  const validated = schema.validate(req.body);
  if (validated.error) {
    log.warn({error: validated.error}, 'Error during user update validation');
    return res.status(400).send({ message: validated.error.message });
  }

  if (req.body.currentPassword
    && req.body.newPassword
    && !(await validateCurrentPassword(req.body.username, req.body.currentPassword))
  ) return res.status(401).send({ message: 'Invalid password' });

  next();
};

const validateCurrentPassword = async (username, currentPassword) => {
  const user = await getUserByUsername(username);
  if (!user) return false;

  try {
    const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatched) return false;
  } catch (err) {
    log.warn({ err }, 'Error during password validation');
    return false;
  }

  return true;
};
