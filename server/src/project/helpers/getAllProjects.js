import { log } from '../../config/logger';
import { config } from '../../config/config';

export const getAllProjects = async () => {
  const client = config.dbClient;
  const query = 'SELECT id, name, short_description, logo_url FROM "PROJECTS"';

  try {
    const res = await client.query(query);

    return res.rows.map(mapProject);
  } catch (error) {
    log.error({ error }, 'Cannot get projects');
    return undefined;
  }
};

const mapProject = (project) => {
  return {
    id: project.id,
    name: project.name,
    shortDescription: project.short_description,
    logoUrl: project.logo_url,
  };
};
