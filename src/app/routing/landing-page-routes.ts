import {Routes} from "@angular/router";
import {GLOBAL_CONSTANTS} from "../global-constants/global-constants";

export const landingPageRoutes: Routes = [
  {
    path: `${GLOBAL_CONSTANTS.routes.LANDING_PAGE}`,
    title: 'Home Page',
    loadComponent: () => import('../pages/landing-page-view/landing-page-view.component').then(module => module.LandingPageViewComponent),
  },
]
