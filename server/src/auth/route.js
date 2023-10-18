import express from "express";
import {registerUser, validateRegisterInput} from "./register-user";
import {loginUser} from "./login-user";

export const authRoute = () => {
  const router = express.Router();

  router.post("/register", validateRegisterInput, registerUser);

  router.post("/login", loginUser);

  return router;
}
