import {config} from '../../config/config';
import {log} from '../../config/logger';
import { v4 as uuidv4 } from 'uuid';

export const createAttachment = async (file) => {
  const client = config.dbClient;
  const INSERT_QUERY = 'INSERT INTO "ATTACHMENTS" (id, name, content, type) VALUES ($1, $2, $3, $4) RETURNING id';
  const VALUES = [uuidv4(), file.name, file.data, file.mimetype];

  try {
    const result = await client.query(INSERT_QUERY, VALUES);
    return result.rows[0].id;
  } catch (err) {
    log.error({err}, 'Cannot create attachment');
  }
  return undefined;
};
