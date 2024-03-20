import {config} from '../../config/config';
import {log} from '../../config/logger';

export const updateExistingUser = async (id, email, firstName, lastName, newPassword) => {
  const client = config.dbClient;
  const UPDATE_USER_WITHOUT_PASSWORD_QUERY = 'UPDATE "USERS" SET e_mail = $1, first_name = $2, last_name = $3 WHERE id = $4';
  const UPDATE_USER_WITH_PASSWORD_QUERY = 'UPDATE "USERS" SET e_mail = $1, first_name = $2, last_name = $3, password = $4 WHERE id = $5';
  const UPDATE_USER_WITHOUT_PASSWORD_VALUES = [email, firstName, lastName, id];
  const UPDATE_USER_WITH_PASSWORD_VALUES = [email, firstName, lastName, newPassword, id];

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
