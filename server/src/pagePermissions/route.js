import {authenticate} from '../auth/utils/authenticate';
import express from 'express';
import {acl} from '../security/permissions/acl';
import {getPermissions} from './getPermissions';
import {addPermissions} from './addPermissions';
import {deletePermissions} from './deletePermissions';

export const pagePermissionsRoute = () => {
  const router = express.Router();
  router.use(authenticate);

  router.get('/projects/:projectId/pages/:pageId/permissions', acl(['page:read']), getPermissions);
  router.post('/projects/:projectId/pages/:pageId/permissions', acl(['page:write']), addPermissions);
  router.delete('/projects/:projectId/pages/:pageId/permissions', acl(['page:write']), deletePermissions);

  return router;
};
