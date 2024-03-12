import { log } from '../../config/logger';
import { config } from '../../config/config';

const DELETE_PROJECT_QUERY = 'DELETE FROM "PROJECTS" WHERE id = $1';
const DELETE_PROJECT_PERMISSIONS_QUERY = 'DELETE FROM "PROJECT_PERMISSIONS" WHERE project_id = $1';
const DELETE_PROJECT_PAGES_QUERY = 'DELETE FROM "PAGES" WHERE project_id = $1';
const GET_PAGES_FOR_PROJECT_QUERY = 'SELECT * FROM "PAGES" WHERE project_id = $1';
const DELETE_PAGE_PERMISSIONS_QUERY = 'DELETE FROM "PAGE_PERMISSIONS" WHERE page_id IN ($1)';

export const deleteProjectById = async (id) => {
  const client = config.dbClient;

  try {
    const pagesRes = await client.query(GET_PAGES_FOR_PROJECT_QUERY, [id]);
    const pages = pagesRes.rows;
    if (pages.length > 0) {
      const pageIds = pages.map((page) => page.id).join(',');
      await client.query(DELETE_PAGE_PERMISSIONS_QUERY, [pageIds]);
      await client.query(DELETE_PROJECT_PAGES_QUERY, [id]);
    }
    await client.query(DELETE_PROJECT_PERMISSIONS_QUERY, [id]);
    await client.query(DELETE_PROJECT_QUERY, [id]);
    return true;
  } catch (err) {
    log.error({ err }, 'Cannot delete project');
  }

  return false;
};
