import Joi from "joi";
import { createNewProject } from "../helpers/createNewProject";

export const validateCreateProjectInput = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    isPublic: Joi.boolean(),
    logoUrl: Joi.string(),
  });

  const validated = schema.validate(req.body);
  if (validated.error) res.status(400).send({ message: validated.error.message });

  next();
};
export const createProject = async (req, res) => {
  const user = req.user;

  const savedProject = await createNewProject(req.body, user.userId);
  if (savedProject) {
    res.status(201).send();
    return;
  }

  res.status(500).send({ message: "Error creating project" });
};
