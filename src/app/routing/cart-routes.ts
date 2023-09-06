import {Routes} from "@angular/router";
import {GLOBAL_CONSTANTS} from "../global-constants/global-constants";

export const cartRoutes: Routes = [
  {
    path: `${GLOBAL_CONSTANTS.routes.CART_PAGE}`,
    title: 'Cart Page',
    loadComponent: () => import('../pages/cart-page-view/cart-page-view.component').then(module => module.CartPageViewComponent),
  },
  {
    path: `${GLOBAL_CONSTANTS.routes.CHECKOUT_PAGE}`,
    title: 'Checkout page',
    loadComponent: () => import('../pages/checkout-page/checkout-page.component').then(module => module.CheckoutPageComponent),
  },
]
