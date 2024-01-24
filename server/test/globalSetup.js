import { v4 as uuidv4 } from 'uuid';
import { config } from '../src/config/config';

module.exports = async () => {
  const query = 'INSERT INTO "USERS"(id, username, password, e_mail, first_name, last_name, created_at, avatar_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

  const values = [uuidv4(), 'testUser', 'testUserPassword', 'test@aswiki.com', null, null, new Date().toISOString(), null];

  await config.dbClient.query(query, values);
};
