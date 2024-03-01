import {addPermissionsForPage} from './helpers/addPermissionsForPage';

export const addPermissions = async (req, res) => {
  const {pageId} = req.params;
  const permissions = req.body;

  const permissionsAdded = await addPermissionsForPage(pageId, permissions);

  if (!permissionsAdded.status && permissionsAdded.message === 'Permissions already exist') {
    return res.status(409).send({message: 'Permissions already exist'});
  }
  if (!permissionsAdded.status && permissionsAdded.message === 'Page does not exist') {
    return res.status(404).send({message: 'Page does not exist'});
  }
  if (!permissionsAdded.status && permissionsAdded.message === 'User does not exist') {
    return res.status(404).send({message: 'User does not exist'});
  }
  if (!permissionsAdded.status && permissionsAdded.message === 'Group does not exist') {
    return res.status(404).send({message: 'Group does not exist'});
  }

  return permissionsAdded.status ? res.status(204).send() : res.status(500).send();
};
