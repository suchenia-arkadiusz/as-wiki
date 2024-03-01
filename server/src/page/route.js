import express from 'express';
import { authenticate } from '../auth/utils/authenticate';
import { getPages } from './getPages';
import {validateCreatePageInput} from './utils/validators';
import {createPage} from './createPage';
import {getPage} from './getPage';
import {updatePage} from './updatePage';
import {deletePage} from './deletePage';
import {acl} from '../security/permissions/acl';
import {checkAccess} from './utils/access';

export const pageRoute = () => {
  const router = express.Router();
  router.use(authenticate);

  router.post('/projects/:projectId/pages', acl(['page:write']), checkAccess, validateCreatePageInput, createPage);
  router.get('/projects/:projectId/pages', acl(['page:read']), getPages);
  router.get('/projects/:projectId/pages/:pageId', acl(['page:read']), checkAccess, getPage);
  router.put('/projects/:projectId/pages/:pageId', acl(['page:write']), checkAccess, validateCreatePageInput, updatePage);
  router.delete('/projects/:projectId/pages/:pageId', acl(['page:write']), checkAccess, deletePage);

  return router;
};
