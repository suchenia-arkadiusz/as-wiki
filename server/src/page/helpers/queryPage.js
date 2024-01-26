import {config} from '../../config/config';
import {log} from '../../config/logger';

export const getPageById = async (pageId) => {
  const client = config.dbClient;
  const query = 'SELECT * FROM PAGE_CONTENT WHERE id = $1';

  try {
    const res = await client.query(query, [pageId]);
    return res.rows.length > 0 ? mapPage(res.rows[0]) : undefined;
  } catch (err) {
    log.error({err}, 'Cannot get page');
  }
};

const mapPage = (page) => ({
  id: page.id,
  name: page.name,
  content: page.content,
  updatedAt: page.updated_at,
  updatedBy: {
    id: page.updated_by,
    username: page.u_username,
    firstName: page.u_first_name,
    lastName: page.u_last_name,
  },
  createdBy: {
    id: page.created_by,
    username: page.c_username,
    firstName: page.c_first_name,
    lastName: page.c_last_name,
  }
});
