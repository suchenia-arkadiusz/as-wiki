import { v4 as uuidv4 } from 'uuid';
import { config } from '../src/config/config';
import { exec } from 'child_process';
import { log } from '../src/config/logger';

module.exports = async () => {
  exec('npx db-migrate up -e test', (err, stdout, stderr) => {
    if (err) {
      log.error({err}, 'Cannot run db migrations');
      return;
    }

    if (stderr) {
      log.warn({stderr}, 'Error during db migrations');
      return;
    }

    log.info({stdout}, 'Run db migrations');
  });

  const query = 'INSERT INTO "USERS"(id, username, password, e_mail, first_name, last_name, created_at, avatar_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

  const values = [uuidv4(), 'testUser', 'testUserPassword', 'test@aswiki.com', null, null, new Date().toISOString(), null];

  await config.dbClient.query(query, values);
};
