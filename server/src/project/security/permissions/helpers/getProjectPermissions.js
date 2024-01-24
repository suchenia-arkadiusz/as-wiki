import { config } from '../../../../config/config';

export const getProjectPermissions = async (projectId) => {
  const client = config.dbClient;
  const query = 'SELECT * FROM "PROJECT_PERMISSIONS" WHERE project_id = $1';

  return (await client.query(query, [projectId])).rows;
};
