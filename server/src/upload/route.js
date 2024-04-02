import express from 'express';
import {authenticate} from '../auth/utils/authenticate';
import {uploadFile} from './uploadFile';
import fileUpload from 'express-fileupload';
import {getFile} from './getFile';

export const uploadRoute = () => {
  const router = express.Router();
  router.get('/upload/:id', getFile);
  router.use(authenticate);

  router.post('/upload', fileUpload({}), uploadFile);

  return router;
};
