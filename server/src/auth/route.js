import express from 'express';
import { registerUser } from './registerUser';
import { loginUser } from './loginUser';
import { validateRegisterInput } from './utils/validateRegisterInput';
import { refreshToken } from './refreshToken';
import { authenticate } from './utils/authenticate';
import { checkToken } from './checkToken';

export const authRoute = () => {
  const router = express.Router();

  router.post('/register', validateRegisterInput, registerUser);
  router.post('/login', loginUser);
  router.get('/refresh', refreshToken);
  router.get('/token', authenticate, checkToken);

  return router;
};
