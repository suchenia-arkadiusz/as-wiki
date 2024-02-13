import express from 'express';
import { authenticate } from '../auth/utils/authenticate';
import { getPages } from './getPages';
import {validateCreatePageInput} from './utils/validators';
import {createPage} from './createPage';
import {getPage} from './getPage';
import {updatePage} from './updatePage';
import {deletePage} from './deletePage';

export const pageRoute = () => {
  const router = express.Router();
  router.use(authenticate);

  router.post('/projects/:projectId/pages', validateCreatePageInput, createPage);
  router.get('/projects/:projectId/pages', getPages);
  router.get('/projects/:projectId/pages/:pageId', getPage);
  router.put('/projects/:projectId/pages/:pageId', validateCreatePageInput, updatePage);
  router.delete('/projects/:projectId/pages/:pageId', deletePage);

  return router;
};
