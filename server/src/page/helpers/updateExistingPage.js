import {getPageById} from './queryPage';
import {log} from '../../config/logger';
import {config} from '../../config/config';

export const updateExistingPage = async (page, pageId, userId) => {
  const client = config.dbClient;
  const existingPage = await getPageById(pageId);
  const updatedPage = {
    ...existingPage,
    ...page
  };

  const query = 'UPDATE "PAGES" SET name = $1, content = $2, updated_at = $3, updated_by = $4, version = $5, is_public = $6, parent_id = $7 WHERE id = $8 RETURNING *';
  const values = [
    updatedPage.name,
    updatedPage.content,
    new Date().toISOString(),
    userId,
    updatedPage.version || 1,
    updatedPage.isPublic === null ? false : updatedPage.isPublic,
    updatedPage.parentId === null ? null : updatedPage.parentId,
    pageId,
  ];

  try {
    const res = await client.query(query, values);

    return res.rows[0];
  } catch (err) {
    log.error({err}, 'Cannot update page');
    return undefined;
  }
};
