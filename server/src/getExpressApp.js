import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config/config';
import { dbConnect } from './db/connect';
import { routes } from './routes';
import cors from 'cors';
import {runMigration} from './db/migration';

export const getApp = async () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());

  config.dbClient = await dbConnect(config.db);

  if (!config.dbClient) {
    process.exit();
  }
  
  runMigration();

  addRoutes(app);

  return app;
};

const addRoutes = (app) => {
  const appRoutes = routes();
  appRoutes.forEach((route) => app.use(route.prefix, route.route));
};
