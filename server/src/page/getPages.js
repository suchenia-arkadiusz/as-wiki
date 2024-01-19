import { getPageList } from "./helpers/getPageList";

export const getPages = async (req, res) => {
  const { projectId, pages } = req.query;
  const response = await getPageList(projectId, pages);

  return res.send(response);
};
