import { getAllProjects } from "../helpers/getAllProjects";

export const getProjects = async (req, res) => {
  const projects = await getAllProjects();
  if (!projects) return res.status(500).send();

  res.status(200).send(projects);
};
