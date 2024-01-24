import {createNewPage} from './helpers/createNewPage';

export const createPage = async (req, res) => {
  const user = req.user;
  const page = await createNewPage(req.body, user.id);

  return res.send(page);
};
