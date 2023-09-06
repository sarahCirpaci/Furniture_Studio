import {Routes} from "@angular/router";
import {GLOBAL_CONSTANTS} from "../global-constants/global-constants";

export const userRoutes: Routes = [
  {
    path: GLOBAL_CONSTANTS.routes.MY_ACCOUNT,
    title: 'My account',
    loadComponent: () => import('../pages/my-account-view/my-account-view.component').then(module => module.MyAccountViewComponent)
  },
]
