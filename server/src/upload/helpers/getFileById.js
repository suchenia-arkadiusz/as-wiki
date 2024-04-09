import {config} from '../../config/config';
import {log} from '../../config/logger';

export const getFileById = async (id) => {
  const client = config.dbClient;
  const query = 'SELECT * FROM "ATTACHMENTS" WHERE id = $1';

  try {
    const res = await client.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    log.error({err}, 'Cannot get file by id');
  }
  return undefined;
};
