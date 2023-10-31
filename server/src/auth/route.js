import express from "express";
import {registerUser} from "./register-user";
import {loginUser} from "./login-user";
import {validateRegisterInput} from "./utils/validate-tegister-input";
import {refreshToken} from "./refresh-token";

export const authRoute = () => {
  const router = express.Router();

  router.post("/register", validateRegisterInput, registerUser);
  router.post("/login", loginUser);
  router.post("/refresh", refreshToken)

  return router;
}
