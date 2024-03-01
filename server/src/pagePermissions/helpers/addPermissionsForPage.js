import {config} from '../../config/config';
import {log} from '../../config/logger';

export const addPermissionsForPage = async (pageId, permissions) => {
  const client = config.dbClient;
  const deletePagePermissionsQuery = 'INSERT INTO "PAGE_PERMISSIONS" (page_id, user_id, group_id) VALUES ($1, $2, $3)';
  const values = [
    pageId,
    permissions.userId,
    permissions.groupId
  ];

  try {
    await client.query(deletePagePermissionsQuery, values);
    return {status: true};
  } catch (err) {
    if (err.code === '23505') {
      log.warn({err}, 'Cannot add permissions for page');
      return {status: false, message: 'Permissions already exist'};
    }
    log.error({err}, 'Cannot add permissions for page');
  }

  return {status: false};
};
