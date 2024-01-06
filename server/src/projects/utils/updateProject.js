import Joi from "joi";
import { updateExistingProject } from "../helpers/updateExistingProject";

export const validateUpdateProjectInput = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    isPublic: Joi.boolean(),
    logoUrl: Joi.string(),
  });

  const validated = schema.validate(req.body);
  if (validated.error) return res.status(400).send({ message: validated.error.message });

  next();
};

export const updateProject = async (req, res) => {
  const user = req.user;
  const projectId = req.params.id;

  const updatedProject = await updateExistingProject(req.body, projectId, user.userId);
  if (updatedProject) {
    res.status(200).send(updatedProject);
    return;
  }

  res.status(500).send({ message: "Error updating project" });
};
