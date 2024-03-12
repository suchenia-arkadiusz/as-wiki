import express from 'express';
import { authenticate } from '../auth/utils/authenticate';
import { createProject, validateCreateProjectInput } from './utils/createProject';
import { updateProject, validateUpdateProjectInput } from './utils/updateProject';
import { getProjects } from './utils/getProjects';
import { getProject } from './utils/getProject';
import { acl } from '../security/permissions/acl';
import {deleteProject} from './utils/deleteProject';

export const projectRoute = () => {
  const router = express.Router();
  router.use(authenticate);

  router.post('/projects', acl(['project:write']), validateCreateProjectInput, createProject);
  router.put('/projects/:id', acl(['project:write']), validateUpdateProjectInput, updateProject);
  router.get('/projects', acl(['project:read']), getProjects);
  router.get('/projects/:id', acl(['project:read']), getProject);
  router.delete('/projects/:id', acl(['project:write']), deleteProject);

  return router;
};
