import {config} from '../../config/config';
import {log} from '../../config/logger';

export const updateExistingUser = async (id, email, firstName, lastName, avatarUrl, newPassword) => {
  const client = config.dbClient;
  const UPDATE_USER_WITHOUT_PASSWORD_QUERY = 'UPDATE "USERS" SET e_mail = $1, first_name = $2, last_name = $3, avatar_url = $4 WHERE id = $5';
  const UPDATE_USER_WITH_PASSWORD_QUERY = 'UPDATE "USERS" SET e_mail = $1, first_name = $2, last_name = $3, password = $4, avatar_url = $5 WHERE id = $6';
  const UPDATE_USER_WITHOUT_PASSWORD_VALUES = [email, firstName, lastName, avatarUrl, id];
  const UPDATE_USER_WITH_PASSWORD_VALUES = [email, firstName, lastName, newPassword, avatarUrl, id];

  try {
    let res;

    if (newPassword) {
      res = await client.query(UPDATE_USER_WITH_PASSWORD_QUERY, UPDATE_USER_WITH_PASSWORD_VALUES);
    } else {
      res = await client.query(UPDATE_USER_WITHOUT_PASSWORD_QUERY, UPDATE_USER_WITHOUT_PASSWORD_VALUES);
    }

    return res.rowCount === 1;
  } catch (err) {
    log.error({err}, 'Cannot update user');
  }

  return false;
};
