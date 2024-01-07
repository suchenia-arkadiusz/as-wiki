export const acl = (permissions) => (req, res, next) => {
  const user = req.user;
  const userGroups = user.userGroups;
  if (userGroups.find((userGroup) => userGroup.name === "ADMIN")) {
    next();
    return;
  }

  const userPermissions = userGroups.reduce((acc, group) => {
    return acc.concat(group.permissions);
  }, []);

  const hasPermission = permissions.some((permission) => {
    return userPermissions.includes(permission);
  });

  if (hasPermission) {
    next();
  } else {
    return res.status(403).send({ message: "You don't have permission" });
  }
};
