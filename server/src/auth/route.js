import express from "express";
import { registerUser } from "./registerUser";
import { loginUser } from "./loginUser";
import { validateRegisterInput } from "./utils/validateRegisterInput";
import { refreshToken } from "./refreshToken";

export const authRoute = () => {
  const router = express.Router();

  router.post("/register", validateRegisterInput, registerUser);
  router.post("/login", loginUser);
  router.post("/refresh", refreshToken);

  return router;
};
