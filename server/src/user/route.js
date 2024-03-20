import express from 'express';
import { authenticate } from '../auth/utils/authenticate';
import { getUsers } from './getUsers';
import {updateUser} from './updateUser';
import {validateUpdateUserInput} from './utils/validators';

export const userRoute = () => {
  const router = express.Router();
  router.use(authenticate);

  router.get('/users', getUsers);
  router.put('/users/:id', validateUpdateUserInput, updateUser);

  return router;
};
