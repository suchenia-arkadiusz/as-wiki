import { getPageList } from './helpers/getPageList';

export const getPages = async (req, res) => {
  const { projectId } = req.params;
  const response = await getPageList(projectId, undefined);

  return res.send(response);
};
