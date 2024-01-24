import { getProjectPermissions } from './helpers/getProjectPermissions';

export const checkProjectPermissions = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const permissions = await getProjectPermissions(id);

    if (permissions && permissions.length > 0) {
      const userPermissions = permissions.find((permission) => permission.user_id === user.id);

      if (!userPermissions) {
        const userGroups = user.userGroups;
        const userGroupsPermissions = permissions.find((permission) => userGroups.includes(permission.group_id));

        if (!userGroupsPermissions) {
          return res.status(403).send({ message: 'You don\'t have permission' });
        }
      }
    }

    next();
  } catch (err) {
    return res.status(404).send({ message: 'Cannot get project permissions' });
  }
};
