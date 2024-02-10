import { exec } from 'child_process';
import { log } from '../config/logger';
import { config } from '../config/config';

export const runMigration = () => {
  exec(`npx db-migrate up -e ${config.environment}`, (err, stdout, stderr) => {
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
};