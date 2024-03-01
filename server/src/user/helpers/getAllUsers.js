import { config } from '../../config/config';
import {log} from '../../config/logger';

export const getAllUsers = async () => {
  const client = config.dbClient;
  const query = 'SELECT * FROM "USERS"';

  try {
    const res = await client.query(query);

    return mapUsers(res.rows);
  } catch (err) {
    log.error({err}, 'Cannot get all users');
  }

  return undefined;
};

const mapUsers = (users) =>
  users.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.e_mail,
    firstName: user.first_name,
    lastName: user.last_name,
  }));
