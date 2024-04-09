import {deletePermissionsForPage} from './helpers/deletePermissionsFromPage';

export const deletePermissions = async (req, res) => {
  const { pageId } = req.params;
  const permissions = req.body;

  const permissionsDeleted = await deletePermissionsForPage(pageId, permissions);

  return permissionsDeleted ? res.status(204).send() : res.status(500).send();
};
