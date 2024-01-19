import { getProjectById } from "../helpers/getProjectById";

export const getProject = async (req, res) => {
  const { id } = req.params;
  const project = await getProjectById(id);
  if (!project) return res.status(404).send();

  res.status(200).send(project);
};
