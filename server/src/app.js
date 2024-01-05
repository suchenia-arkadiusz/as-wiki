import { log } from "./config/logger";
import { getApp } from "./getExpressApp";

const start = () => {
  const app = getApp();

  app.listen(3000, () => {
    log.info({}, "The asWiki app is started!");
  });
};

start();
