import { log } from '../config/logger';
import { getAllUserGroups } from './helpers/getAllUserGroups';

export const getUserGroups = async (req, res) => {
  try {
    const userGroups = await getAllUserGroups();
    res.status(200).send(userGroups);
  } catch (err) {
    log.warn({ err }, 'Cannot get user groups');
    res.status(500).send({ message: 'Cannot get user groups' });
  }
};
