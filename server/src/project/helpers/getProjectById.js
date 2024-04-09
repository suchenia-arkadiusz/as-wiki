import { log } from '../../config/logger';
import { config } from '../../config/config';

export const getProjectById = async (id) => {
  const client = config.dbClient;
  const query = 'SELECT project.*, pages.num_pages FROM "PROJECTS" AS project LEFT JOIN (SELECT project_id, count(*) AS num_pages FROM "PAGES" GROUP BY project_id) AS pages ON pages.project_id =' +
    ' project.id WHERE project.id = $1';
  const values = [id];

  try {
    const res = await client.query(query, values);

    return mapProject(res.rows[0]);
  } catch (error) {
    log.error({ error }, 'Cannot get project');
    return undefined;
  }
};

const mapProject = (project) => {
  return {
    id: project.id,
    name: project.name,
    shortDescription: project.short_description,
    description: project.description,
    numberOfPages: project.num_pages,
    createdAt: project.created_at,
    createdBy: project.created_by,
    updatedAt: project.updated_at,
    updatedBy: project.updated_by,
    version: project.version,
  };
};
