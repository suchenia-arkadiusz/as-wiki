import {getPermissionsForPage} from '../../pagePermissions/helpers/getPermissionsForPage';

export const checkAccess = async (req, res, next) => {
  const {projectId, pageId} = req.params;
  const user = req.user;

  const pagePermissions = await getPermissionsForPage(projectId, pageId);

  if (!pagePermissions.permissions && !pagePermissions.inheritedPermissions) return next();

  const foundUser = findUser(pagePermissions, user.id);
  if (foundUser) return next();

  const userGroups = user.userGroups;
  const foundGroup = findGroup(pagePermissions, userGroups);
  if (foundGroup) return next();

  return res.status(403).send({message: 'Access denied'});
};

const findUser = (permissions, userId) => {
  const pagePermissions = [];
  if (permissions.permissions && permissions.permissions.length > 0) pagePermissions.push(...permissions.permissions);
  if (permissions.inheritedPermissions && permissions.inheritedPermissions.length > 0) pagePermissions.push(...permissions.inheritedPermissions);

  return pagePermissions.find((permission) => permission.userId === userId);
};

const findGroup = (permissions, userGroups) => {
  const pagePermissions = [];
  if (permissions.permissions && permissions.permissions.length > 0) pagePermissions.push(...permissions.permissions);
  if (permissions.inheritedPermissions && permissions.inheritedPermissions.length > 0) pagePermissions.push(...permissions.inheritedPermissions);

  const userGroupIds = userGroups.map((group) => group.id);

  return pagePermissions.find((permission) => userGroupIds.includes(permission.groupId));
};
