import {CartItem} from "./cart";
import {CheckoutDataDTO} from "./checkout-data";

export interface OrderDTO {
  id: number | undefined;
  user_id: string;
  products: CartItem[];
  created_at?: Date;
  status?: string;
  tracking_number?: string;
  checkout_data: CheckoutDataDTO;
}
