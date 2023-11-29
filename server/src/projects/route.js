import express from "express";
import { authenticate } from "../auth/utils/authenticate";
import { createProject, validateCreateProjectInput } from "./utils/createProject";
import { updateProject, validateUpdateProjectInput } from "./utils/updateProject";
import { getProjects } from "./utils/getProjects";
import { getProject } from "./utils/getProject";

export const projectRoute = () => {
  const router = express.Router();
  router.use(authenticate);

  router.post("/projects", validateCreateProjectInput, createProject);
  router.put("/projects/:id", validateUpdateProjectInput, updateProject);
  router.get("/projects", getProjects);
  router.get("/projects/:id", getProject);

  return router;
};
