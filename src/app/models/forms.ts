import {FormControl} from "@angular/forms";

export interface UserForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface CheckoutForm {
  email: FormControl<string | null>;
  city: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  deliveryAddress: FormControl<string | null>;
}
