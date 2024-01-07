import { config } from "./config/config";
import { authRoute } from "./auth/route";
import { projectRoute } from "./projects/route";
import { userRoute } from "./user/route";
import { userGroupRoute } from "./userGroup/route";

export const routes = () => {
  const prefix = config.uriPrefix;

  return [
    { prefix: "", route: authRoute() },
    { prefix, route: projectRoute() },
    { prefix, route: userRoute() },
    { prefix, route: userGroupRoute() },
  ];
};
