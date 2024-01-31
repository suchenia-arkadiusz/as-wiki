import {config} from '../../config/config';
import { v4 as uuidv4} from 'uuid';
import {log} from '../../config/logger';

const INSERT_PAGE_QUERY = `INSERT INTO "PAGES" (id, name, content, created_at, created_by, updated_at, updated_by, version, is_public, project_id, parent_id)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

export const createNewPage = async (page, userId, projectId) => {
  const client = config.dbClient;
  const values = [
    uuidv4(),
    page.name,
    page.content,
    new Date().toISOString(),
    userId,
    new Date().toISOString(),
    userId,
    1,
    page.isPublic === null ? false : page.isPublic,
    projectId,
    page.parentId === null ? null : page.parentId,
  ];

  try {
    const res = await client.query(INSERT_PAGE_QUERY, values);
    return mapPage(res.rows[0]);
  } catch (error) {
    log.error({error}, 'Cannot create page');
    return undefined;
  }
};

const mapPage = (page) => ({
  id: page.id,
  name: page.name,
  content: page.content,
  createdAt: page.created_at,
  createdBy: page.created_by,
  updatedAt: page.updated_at,
  updatedBy: page.updated_by,
  version: page.version,
  isPublic: page.is_public,
  projectId: page.project_id,
  parentId: page.parent_id
});
