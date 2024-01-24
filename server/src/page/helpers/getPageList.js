import { config } from '../../config/config';

export const getPageList = async (projectId) => {
  const client = config.dbClient;
  const query = 'SELECT * FROM "PAGES" WHERE project_id = $1';
  const values = [projectId];

  const res = await client.query(query, values);
  return res.rows || [];
};
