import express from "express";
import { dbConnect } from "./db/connect";
import { config } from "./config/config";
import { routes } from "./routes";
import cookieParser from "cookie-parser";

const start = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  config.dbClient = dbConnect(config.db);

  addRoutes(app);

  app.listen(3000, () => {
    console.log("The asWiki app is started!");
  });
};

const addRoutes = (app) => {
  const appRoutes = routes();
  appRoutes.forEach((route) => app.use(route.prefix, route.route));
};

start();
