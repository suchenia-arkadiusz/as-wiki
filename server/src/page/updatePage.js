import {updateExistingPage} from './helpers/updateExistingPage';

export const updatePage = async (req, res) => {
  const { pageId } = req.params;
  const user = req.user;
  const page = await updateExistingPage(req.body, pageId, user.id);

  return page ? res.status(200).send(page) : res.status(404).send();
};
