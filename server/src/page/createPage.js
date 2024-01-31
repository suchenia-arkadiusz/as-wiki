import {createNewPage} from './helpers/createNewPage';

export const createPage = async (req, res) => {
  const projectId = req.params.projectId;
  const user = req.user;
  const page = await createNewPage(req.body, user.id, projectId);

  return res.send(page);
};
