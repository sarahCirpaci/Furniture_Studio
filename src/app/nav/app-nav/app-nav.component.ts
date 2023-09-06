import { Component } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ProductCategory} from "../../models/product_category";
import {User} from "@supabase/supabase-js";
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent {
  public productCategories$: Observable<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>([])
  public cartQuantity$: BehaviorSubject<number>;
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private readonly productService: ProductService,
              private readonly cartService: CartService,
              private readonly userService: UserService) {
    this.productCategories$ = this.productService.getCategories();
    this.cartQuantity$ = this.cartService.cartQuantity$;
    this.user$ = this.userService.user$;
  }
}
