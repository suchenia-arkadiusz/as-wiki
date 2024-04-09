import {getPermissionsForPage} from './helpers/getPermissionsForPage';

export const getPermissions = async (req, res) => {
  const { projectId, pageId } = req.params;
  const permissions = await getPermissionsForPage(projectId, pageId);

  return res.json(permissions);
};
