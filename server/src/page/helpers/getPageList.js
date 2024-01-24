import { config } from "../../config/config";

export const getPageList = async (projectId, parents) => {
  const client = config.dbClient;
  const parentIdQuery = parents && parents.length > 0 ? "parent_id in $2" : "parent_id is null";
  const query = `SELECT * FROM PAGE_LIST WHERE project_id = $1 and ${parentIdQuery}`;
  const values = [projectId];

  const res = await client.query(query, values);
  return res.rows && res.rows.length > 0 ? mapPages(res.rows) : undefined;
};

const mapPages = (pages) =>
  pages.map((page) => ({
    id: page.id,
    name: page.name,
    parentId: page.parent_id,
    projectId: page.project_id,
    children: page.get_page_children && page.get_page_children.length > 0 ? mapChildren(page.get_page_children) : undefined,
  }));

const mapChildren = (children) =>
  children
    .match(/"(.*)"/)[1]
    .split("\",\"")
    .map((child) => {
      const childProps = child.match(/\((.*)\)/)[1].split(",");
      return {
        id: childProps[0],
        name: childProps[1],
      };
    });
