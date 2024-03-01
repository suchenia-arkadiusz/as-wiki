import {addPermissionsForPage} from './helpers/addPermissionsForPage';

export const addPermissions = async (req, res) => {
  const {pageId} = req.params;
  const permissions = req.body;

  const permissionsAdded = await addPermissionsForPage(pageId, permissions);

  if (!permissionsAdded.status && permissionsAdded.message === 'Permissions already exist') {
    return res.status(409).send({message: 'Permissions already exist'});
  }

  return permissionsAdded ? res.status(200).send() : res.status(500).send();
};
