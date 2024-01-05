import express from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/config";
import { dbConnect } from "./db/connect";
import { routes } from "./routes";

export const getApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  config.dbClient = dbConnect(config.db);

  addRoutes(app);

  return app;
};

const addRoutes = (app) => {
  const appRoutes = routes();
  appRoutes.forEach((route) => app.use(route.prefix, route.route));
};
