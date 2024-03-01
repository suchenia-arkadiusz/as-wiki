import { config } from './config/config';
import { authRoute } from './auth/route';
import { projectRoute } from './project/route';
import { userRoute } from './user/route';
import { userGroupRoute } from './userGroup/route';
import { pageRoute } from './page/route';
import {pagePermissionsRoute} from './pagePermissions/route';

export const routes = () => {
  const prefix = config.uriPrefix;

  return [
    { prefix: '', route: authRoute() },
    { prefix, route: projectRoute() },
    { prefix, route: userRoute() },
    { prefix, route: userGroupRoute() },
    { prefix, route: pageRoute() },
    { prefix, route: pagePermissionsRoute() }
  ];
};
