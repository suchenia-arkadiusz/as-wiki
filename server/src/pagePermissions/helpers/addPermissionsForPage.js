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
      log.warn({err}, 'Permissions already exist');
      return {status: false, message: 'Permissions already exist'};
    }
    if (err.code === '23503' && err.detail.indexOf('Key (page_id)') > -1) {
      log.warn({err},'Page does not exist');
      return {status: false, message: 'Page does not exist'};
    }
    if (err.code === '23503' && err.detail.indexOf('Key (user_id)') > -1) {
      log.warn({err},'User does not exist');
      return {status: false, message: 'User does not exist'};
    }
    if (err.code === '23503' && err.detail.indexOf('Key (group_id)') > -1) {
      log.warn({err},'Group does not exist');
      return {status: false, message: 'Group does not exist'};
    }
    log.error({err}, 'Cannot add permissions for page');
  }

  return {status: false};
};
