import {config} from '../../config/config';
import {log} from '../../config/logger';

export const searchPagesFromDB = async (searchTerm) => {
  const client = config.dbClient;
  const query = `SELECT id, name, project_id FROM "PAGES" WHERE LOWER(name) LIKE LOWER('%${searchTerm}%') OR LOWER(content) LIKE LOWER('%${searchTerm}%')`;

  try {
    const res = await client.query(query);
    return res.rows && res.rows.length > 0 ? mapResult(res.rows) : [];
  } catch (err) {
    log.error({err}, 'Error while searching pages');
    return [];
  }
};

const mapResult = (pages) => {
  return pages.map((page) => {
    return {
      id: page.id,
      name: page.name,
      projectId: page.project_id,
    };
  });
};
