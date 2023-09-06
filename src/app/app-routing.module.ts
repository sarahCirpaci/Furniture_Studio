import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {landingPageRoutes} from "./routing/landing-page-routes";
import {authRoutes} from "./routing/auth-routes";
import {defaultPathRoutes} from "./routing/default-path-routes";
import {productRoutes} from "./routing/product-routes";
import {cartRoutes} from "./routing/cart-routes";
import {userRoutes} from "./routing/user-routes";

const routes: Routes = [
  ...landingPageRoutes,
  ...productRoutes,
  ...cartRoutes,
  ...authRoutes,
  ...userRoutes,
  ...defaultPathRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
