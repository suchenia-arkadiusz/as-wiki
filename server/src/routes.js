import { config } from "./config/config";
import { authRoute } from "./auth/route";

export const routes = () => {
  const prefix = config.uriPrefix;

  return [{ prefix: "", route: authRoute() }];
};
