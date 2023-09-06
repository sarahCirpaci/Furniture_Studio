import {GLOBAL_CONSTANTS} from "../global-constants/global-constants";

export const defaultPathRoutes = [
  {
    path: '**',
    redirectTo: `${GLOBAL_CONSTANTS.routes.LANDING_PAGE}`,
  }
]
