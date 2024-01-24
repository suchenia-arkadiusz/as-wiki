import Joi from 'joi';
import { createNewProject } from '../helpers/createNewProject';

export const validateCreateProjectInput = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    isPublic: Joi.boolean(),
    logoUrl: Joi.string(),
    permissions: Joi.object({
      users: Joi.array().items(Joi.string()),
      groups: Joi.array().items(Joi.string()),
    }),
  });

  const validated = schema.validate(req.body);
  if (validated.error) return res.status(400).send({ message: validated.error.message });

  next();
};
export const createProject = async (req, res) => {
  const user = req.user;

  const savedProject = await createNewProject(req.body, user.id);
  if (savedProject) {
    res.status(200).send(savedProject);
    return;
  }

  res.status(500).send({ message: 'Error creating project' });
};
