import {Injectable} from "@angular/core";
import {User} from "@supabase/supabase-js";
import {SupabaseService} from "./supabase.service";
import {CartService} from "./cart.service";
import {GLOBAL_CONSTANTS} from "../global-constants/global-constants";
import {OrderDTO} from "../models/orderDTO";
import {CheckoutDataDTO} from "../models/checkout-data";

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {

  constructor(private supabaseService: SupabaseService,
              private cartService: CartService) {

  }
   placeOrder(user: User, checkoutData: CheckoutDataDTO) {
    const cartItems = this.cartService.getCartItems();
    const order: OrderDTO = {
      id: undefined,
      checkout_data: checkoutData,
      products: cartItems,
      user_id: user.id,
      status: 'Placed',
      created_at: undefined
    }
    return this.supabaseService.getSupaBase().from(GLOBAL_CONSTANTS.ORDER).insert(order);
  }
}
