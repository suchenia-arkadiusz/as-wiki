import {config} from '../../config/config';
import {log} from '../../config/logger';

const PAGE_QUERY = 'SELECT * FROM "PAGES" WHERE id = $1';
const PAGE_INHERITED_PERMISSIONS_QUERY = 'SELECT * FROM "PAGE_PERMISSIONS" WHERE page_id = $1';

export const getPermissionsForPage = async (projectId, pageId) => {
  const client = config.dbClient;
  const pagePermissionsQuery = 'SELECT * FROM "PAGE_PERMISSIONS" WHERE page_id = $1';
  const projectPermissionsQuery = 'SELECT * FROM "PROJECT_PERMISSIONS" WHERE project_id = $1';

  try {
    const pagePermissionsRes = await client.query(pagePermissionsQuery, [pageId]);
    const pagePermissions = pagePermissionsRes.rows;
    if (pagePermissions.length > 0) return { permissions: mapPermissions(pagePermissions) };

    const inheritedPermissions = await getInheritedPermissions(pageId, client);
    if (inheritedPermissions) return { inheritedPermissions: mapPermissions(inheritedPermissions) };

    const projectPermissionsRes = await client.query(projectPermissionsQuery, [projectId]);
    return projectPermissionsRes.rows.length > 0 ? { inheritedPermissions: mapPermissions(projectPermissionsRes.rows) } : {};

  } catch (err) {
    log.error({err}, 'Cannot get permissions for page');
  }

  return {};
};

const getInheritedPermissions = async (pageId, client) => {
  try {
    const pageRes = await client.query(PAGE_QUERY, [pageId]);
    const page = pageRes.rows[0];
    if (!page.parent_id) return undefined;

    const pageInheritedPermissionsRes = await client.query(PAGE_INHERITED_PERMISSIONS_QUERY, [page.parent_id]);
    if (pageInheritedPermissionsRes.rows.length > 0) return pageInheritedPermissionsRes.rows;

    return getInheritedPermissions(page.parent_id, client);
  } catch (err) {
    log.error({err}, 'Cannot get inherited permissions for page');
  }
};

const mapPermissions = (permissions) =>
  permissions.map((permission) => ({
    pageId: permission.page_id,
    userId: permission.user_id,
    groupId: permission.group_id,
  }));
