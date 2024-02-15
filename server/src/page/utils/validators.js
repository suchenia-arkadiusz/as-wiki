import {log} from '../../config/logger';
import Joi from 'joi';

export const validateCreatePageInput = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    content: Joi.string(),
    isPublic: Joi.boolean(),
    parentId: Joi.string().allow(null),
  });

  const validated = schema.validate(req.body);
  if (validated.error) {
    log.warn({error: validated.error}, 'Error during page validation');
    return res.status(400).send({ message: validated.error.message });
  }

  next();
};
