import {config} from "./config/config.js";
import {authRoute} from "./auth/route.js";

export const routes = () => {
  const prefix = config.uriPrefix;

  return [
    {prefix: "", route: authRoute()}
  ]
}
