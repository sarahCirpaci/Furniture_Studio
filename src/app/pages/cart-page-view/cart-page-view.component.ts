import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartService} from "../../services/cart.service";
import {BehaviorSubject} from "rxjs";
import {MatCardModule} from "@angular/material/card";
import {GLOBAL_CONSTANTS} from "../../global-constants/global-constants";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CartItem} from "../../models/cart";
import {MatListModule} from "@angular/material/list";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cart-page-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule, RouterLink],
  templateUrl: './cart-page-view.component.html',
  styleUrls: ['./cart-page-view.component.scss']
})
export class CartPageViewComponent {

  protected cartItems$: BehaviorSubject<CartItem[] | null> = new BehaviorSubject<CartItem[] | null>(null);
  protected totalPrice$:  BehaviorSubject<number> = new BehaviorSubject<number>(0);
  protected readonly GLOBAL_CONSTANTS = GLOBAL_CONSTANTS;
  protected routes = GLOBAL_CONSTANTS.routes
  constructor(private readonly cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
    this.totalPrice$ = this.cartService.totalPrice$
  }


  decreaseQuantityForCartItem(id: number | undefined){
    this.cartService.decreaseQuantityForCartItem(id);
  }

  increaseQuantityForCartItem(id: number | undefined){
    this.cartService.increaseQuantityForCartItem(id)
  }

  removeItemFromCart(id: number | undefined){
    this.cartService.removeItemFromCart(id);
  }
}
