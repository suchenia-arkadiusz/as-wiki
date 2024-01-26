import {getPageById} from './helpers/queryPage';

export const getPage = async (req, res) => {
  const { pageId } = req.params;
  const page = await getPageById(pageId);

  return res.send(page);
};
