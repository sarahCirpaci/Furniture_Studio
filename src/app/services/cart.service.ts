import {Injectable} from "@angular/core";
import {GLOBAL_CONSTANTS} from "../global-constants/global-constants";
import {Product} from "../models/product";
import {BehaviorSubject} from "rxjs";
import {CartItem} from "../models/cart";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class CartService {

  public cartQuantity$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartItems$: BehaviorSubject<CartItem[] | null> = new BehaviorSubject<CartItem[] | null>(null);
  public totalPrice$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor(private snackbar: MatSnackBar) {
    this.cartQuantity$.next(+this.getCartItemsQuantity())
    this.cartItems$.next(this.getCartItems())
    this.totalPrice$.next(+this.getTotalPriceForCart())
  }

  addToCart(product: Product) {
    let cartItems: CartItem[] = JSON.parse(localStorage.getItem(GLOBAL_CONSTANTS.CART_ITEMS) ?? '[]');
    let cartItemsQuantity = 0;
    let productQty = 0;
    let cartTotalPrice = 0;
    let updatedCartItems: CartItem[] = [];
    //iterate each cartItem to find out what is the price and the quantity before adding to cart
    cartItems.forEach(cartItem => {
      cartItemsQuantity = cartItemsQuantity + cartItem.quantity;
      cartTotalPrice = cartTotalPrice + (cartItem.product.price * cartItem.quantity);
      if (cartItem.product.id !== product.id) {
        updatedCartItems.push(cartItem);
      } else if (cartItem.product.id === product.id) {
        productQty = productQty + cartItem.quantity
      }
    })
    updatedCartItems.push({
      product: product,
      quantity: productQty + 1
    });
    //increase qty and update price
    cartItemsQuantity++;
    cartTotalPrice = cartTotalPrice + product.price
    this.updateToSessionAndToSubjects(updatedCartItems, cartItemsQuantity, cartTotalPrice);
    this.snackbar.open(`Product "${product.name}" was added successfully in cart`, "Close", {
      duration: 4000,
      panelClass: 'snackbar-success'
    })

  }

  getCartItems(): CartItem[] {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem(GLOBAL_CONSTANTS.CART_ITEMS) ?? '[]');
    this.sortCarItems(cartItems);
    return cartItems;
  }

  getCartItemsQuantity(): string {
    return localStorage.getItem(GLOBAL_CONSTANTS.CART_ITEMS_QUANTITY) ?? '0'
  }

  getTotalPriceForCart() {
    return localStorage.getItem(GLOBAL_CONSTANTS.CART_TOTAL_PRICE) ?? '0'
  }

  decreaseQuantityForCartItem(id: number | undefined) {
    this.increaseOrDecreaseQuantityForCartItem(id, false)
  }

  increaseQuantityForCartItem(id: number | undefined) {
    this.increaseOrDecreaseQuantityForCartItem(id, true)
  }

  increaseOrDecreaseQuantityForCartItem(id: number | undefined, increase: boolean) {
    let cartItemsQuantity = 0;
    let cartTotalPrice = 0;
    let cartItems: CartItem[] = JSON.parse(localStorage.getItem(GLOBAL_CONSTANTS.CART_ITEMS) ?? '[]');
    let updatedCartItems: CartItem[] = [];
    let cartItemsWithCartItemById: CartItem[] = [];

    cartItems.forEach(cartItem => {
      cartItemsQuantity = cartItemsQuantity + cartItem.quantity;
      cartTotalPrice = cartTotalPrice + (cartItem.product.price * cartItem.quantity)
      if (cartItem.product.id !== id) {
        updatedCartItems.push(cartItem);
      } else if (cartItem.product.id === id) {
        cartItemsWithCartItemById.push(cartItem)
      }
    })
    if (increase) {
      cartItemsWithCartItemById[0].quantity++;
      cartItemsQuantity++;
      cartTotalPrice = cartTotalPrice + cartItemsWithCartItemById[0].product.price
    } else {
      cartItemsWithCartItemById[0].quantity--;
      cartItemsQuantity--;
      cartTotalPrice = cartTotalPrice - cartItemsWithCartItemById[0].product.price
    }
    if (cartItemsWithCartItemById[0].quantity > 0) {
      updatedCartItems.push(cartItemsWithCartItemById[0])
    }
    this.updateToSessionAndToSubjects(updatedCartItems, cartItemsQuantity, cartTotalPrice)
  }

  sortCarItems(cartItems: CartItem[]) {
    cartItems.sort((n1, n2) => {
      if (n1?.product?.name > n2?.product?.name) {
        return 1;
      }
      if (n1.product.name < n2.product.name) {
        return -1;
      }
      return 0;
    });
  }

  removeItemFromCart(id: number | undefined) {
    let cartItems: CartItem[] = JSON.parse(localStorage.getItem(GLOBAL_CONSTANTS.CART_ITEMS) ?? '[]');
    let filteredCartItems: CartItem[] = [];
    let cartItemQuantity = 0;
    let cartItemTotalPrice = 0;
    if (cartItems) {
      cartItems.forEach(cartItem => {
        if (cartItem.product.id !== id) {
          filteredCartItems.push(cartItem);
        } else if (cartItem.product.id === id) {
          cartItemQuantity = cartItem.quantity;
          cartItemTotalPrice = cartItem.product.price * cartItem.quantity;
        }
      })
    }
    let initialCartItemsTotalPrice = localStorage.getItem(GLOBAL_CONSTANTS.CART_TOTAL_PRICE) ?? '0';
    let initialCartItemsQuantity = localStorage.getItem(GLOBAL_CONSTANTS.CART_ITEMS_QUANTITY) ?? '0';
    const updatedCartItemsQuantity = +initialCartItemsQuantity - cartItemQuantity;
    const updatedCartItemsTotalPrice = +initialCartItemsTotalPrice - cartItemTotalPrice;
    this.updateToSessionAndToSubjects(filteredCartItems, updatedCartItemsQuantity, updatedCartItemsTotalPrice)
  }

  updateToSessionAndToSubjects(cartItems: CartItem[], cartQuantity: number, cartTotalPrice: number) {
    localStorage.setItem(GLOBAL_CONSTANTS.CART_ITEMS, JSON.stringify(cartItems));
    localStorage.setItem(GLOBAL_CONSTANTS.CART_ITEMS_QUANTITY, cartQuantity.toString())
    localStorage.setItem(GLOBAL_CONSTANTS.CART_TOTAL_PRICE, cartTotalPrice.toString())
    this.cartItems$.next(this.getCartItems())
    this.cartQuantity$.next(+this.getCartItemsQuantity())
    this.totalPrice$.next(+this.getTotalPriceForCart())
  }

  clearCart() {
    localStorage.removeItem(GLOBAL_CONSTANTS.CART_ITEMS);
    localStorage.removeItem(GLOBAL_CONSTANTS.CART_ITEMS_QUANTITY);
    localStorage.removeItem(GLOBAL_CONSTANTS.CART_TOTAL_PRICE)
    this.cartItems$.next(this.getCartItems())
    this.cartQuantity$.next(+this.getCartItemsQuantity())
    this.totalPrice$.next(+this.getTotalPriceForCart())
  }

}
