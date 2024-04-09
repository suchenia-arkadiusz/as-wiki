import {getPageById} from './helpers/queryPage';

export const getPage = async (req, res) => {
  const { pageId } = req.params;
  const page = await getPageById(pageId);

  return page ? res.status(200).send(page) : res.status(404).send();
};
