import express from "express";
import { authenticate } from "../auth/utils/authenticate";
import { getUserGroups } from "./getUserGroups";

export const userGroupRoute = () => {
  const router = express.Router();
  router.use(authenticate);

  router.get("/user-groups", getUserGroups);

  return router;
};
