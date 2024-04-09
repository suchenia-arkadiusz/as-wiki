import {config} from '../../config/config';
import {log} from '../../config/logger';

export const deletePermissionsForPage = async (pageId, permissions) => {
  const client = await config.dbClient;
  const deletePagePermissionsForUserQuery = 'DELETE FROM "PAGE_PERMISSIONS" WHERE page_id = $1 AND user_id = $2';
  const deletePagePermissionsForGroupQuery = 'DELETE FROM "PAGE_PERMISSIONS" WHERE page_id = $1 AND group_id = $2';
  const query = permissions.userId ? deletePagePermissionsForUserQuery : deletePagePermissionsForGroupQuery;
  const values = [
    pageId,
    permissions.userId ? permissions.userId : permissions.groupId
  ];

  try {
    await client.query(query, values);
    return true;
  } catch (err) {
    log.error({err}, 'Cannot delete permissions for page');
  }

  return false;
};
