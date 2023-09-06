import {Routes} from "@angular/router";
import {GLOBAL_CONSTANTS} from "../global-constants/global-constants";

export const productRoutes: Routes = [
  {
    path: `${GLOBAL_CONSTANTS.routes.PRODUCTS_PAGE}/:page/:category`,
    title: 'Products',
    loadComponent: () => import('../pages/product-list/product-list.component').then(module => module.ProductList),
  },
  {
    path: `${GLOBAL_CONSTANTS.routes.PRODUCT_DETAILS_PAGE}/:product`,
    title: 'Product detail page',
    loadComponent: () => import('../pages/product-details-page/product-details-page.component').then(module => module.ProductDetailsPageComponent),
  },
]
