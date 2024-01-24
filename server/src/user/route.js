import express from 'express';
import { authenticate } from '../auth/utils/authenticate';
import { getUsers } from './getUsers';

export const userRoute = () => {
  const router = express.Router();
  router.use(authenticate);

  router.get('/users', getUsers);

  return router;
};
