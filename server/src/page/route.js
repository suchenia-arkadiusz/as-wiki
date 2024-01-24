import express from "express";
import { authenticate } from "../auth/utils/authenticate";
import { getPages } from "./getPages";
import {validateCreatePageInput} from "./utils/validators";
import {createPage} from "./createPage";

export const pageRoute = () => {
  const router = express.Router();
  router.use(authenticate);

  router.post("/projects/:projectId/pages", validateCreatePageInput, createPage);
  router.get("/projects/:projectId/pages", getPages);

  return router;
};
