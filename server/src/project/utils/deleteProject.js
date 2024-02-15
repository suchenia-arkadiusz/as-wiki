import {deleteProjectById} from '../helpers/deleteProject';

export const deleteProject = async (req, res) => {
  const projectId = req.params.id;
  const deleted = await deleteProjectById(projectId);

  if (deleted) {
    return res.status(204).send();
  }

  return res.status(500).send({ message: 'Cannot delete project' });
};
