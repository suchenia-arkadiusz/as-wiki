import { config } from '../../config/config';

export const getPageList = async (projectId) => {
  const client = config.dbClient;
  const query = 'SELECT id, name, parent_id FROM "PAGES" WHERE project_id = $1';
  const values = [projectId];

  const res = await client.query(query, values);
  return mapPages(res.rows || []);
};

const mapPages = (pages) => pages.map((page) => ({
  id: page.id,
  name: page.name,
  parentId: page.parent_id,
}));
