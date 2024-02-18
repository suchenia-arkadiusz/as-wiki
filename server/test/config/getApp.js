import {getApp} from '../../src/getExpressApp';

let app = undefined;

export const getExpressApp = async () => {
  if (app) return app;

  app = await getApp();
  return app;
};
