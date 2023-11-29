import { config } from "./config/config";
import { authRoute } from "./auth/route";
import { projectRoute } from "./projects/route";

export const routes = () => {
  const prefix = config.uriPrefix;

  return [
    { prefix: "", route: authRoute() },
    { prefix, route: projectRoute() },
  ];
};
