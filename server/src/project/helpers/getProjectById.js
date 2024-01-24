import { log } from '../../config/logger';
import { config } from '../../config/config';

export const getProjectById = async (id) => {
  const client = config.dbClient;
  const query = 'SELECT * FROM "PROJECTS" WHERE id = $1';
  const values = [id];

  try {
    const res = await client.query(query, values);

    return res.rows[0];
  } catch (error) {
    log.error({ error }, 'Cannot get project');
    return undefined;
  }
};
