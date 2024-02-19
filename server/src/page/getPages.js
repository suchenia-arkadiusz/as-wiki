import { getPageList } from './helpers/getPageList';

export const getPages = async (req, res) => {
  const { projectId } = req.params;
  const pages = await getPageList(projectId, undefined);

  return res.send(createPagesList(pages));
};

const createPagesList = (pages) => {
  const result = pages.filter((page) => !page.parentId);

  return result.map((page) => ({
    id: page.id,
    name: page.name,
    children: getChildrenPages(pages, page.id),
    parentId: page.parentId,
  }));
};

const getChildrenPages = (pages, parentId) => {
  const children = pages.filter((page) => page.parentId === parentId);
  return children.map((page) => ({
    id: page.id,
    name: page.name,
    children: getChildrenPages(pages, page.id),
    parentId: page.parentId,
  }));
};
