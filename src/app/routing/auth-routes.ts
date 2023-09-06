import {Routes} from "@angular/router";
import {GLOBAL_CONSTANTS} from "../global-constants/global-constants";

export const authRoutes: Routes = [
  {
    path: GLOBAL_CONSTANTS.routes.LOGIN,
    title: 'Login Page',
    loadComponent: () => import('../pages/login-view/login-view.component').then(module => module.LoginViewComponent)
  },
  {
    path: GLOBAL_CONSTANTS.routes.SIGNUP,
    title: 'Signup',
    loadComponent: () => import('../pages/signup-view/signup-view.component').then(module => module.SignupViewComponent)
  },
]
