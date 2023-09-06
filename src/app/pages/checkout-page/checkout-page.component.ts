import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CheckoutForm} from "../../models/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {GLOBAL_CONSTANTS} from "../../global-constants/global-constants";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../../services/cart.service";
import {CheckoutService} from "../../services/checkout-service";
import {CheckoutDataDTO} from "../../models/checkout-data";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  protected userFromLocalStorage;
  protected userEmail;
  protected cartTotalPrice: number;
  protected cartItemsQuantity: number;
  protected readonly GLOBAL_CONSTANTS = GLOBAL_CONSTANTS;
  protected checkoutForm: FormGroup<CheckoutForm> = new FormGroup<CheckoutForm>({
    deliveryAddress: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  })

  constructor(private userService: UserService,
              private readonly router: Router,
              private readonly snackBar: MatSnackBar,
              private readonly checkoutService: CheckoutService,
              private readonly cartService: CartService) {
    this.cartTotalPrice = +this.cartService.getTotalPriceForCart();
    this.cartItemsQuantity = +this.cartService.getCartItemsQuantity();
    this.userFromLocalStorage = this.userService.getUserFromLocalStorage();
    this.userEmail = this.userService.getUserEmailFromLocalStorage();
  }

  ngOnInit() {
    if (this.userFromLocalStorage === null) {
      this.snackBar.open('You should login before proceed with order', 'Close', {
        duration: 4000
      })
      this.router.navigate([GLOBAL_CONSTANTS.routes.LOGIN])
    }
    if (this.userEmail !== null) {
      this.userEmail = this.userEmail.replaceAll('"','')
      this.checkoutForm.controls.email.setValue(this.userEmail)
    }
  }

  submit(){
    if(this.checkoutForm.valid && this.userFromLocalStorage){
      this.checkoutService.placeOrder(this.userFromLocalStorage, this.checkoutForm.value as CheckoutDataDTO).then(result => {
        if(result.error){
          this.snackBar.open(`There was an error with placing order`, 'Close', {
            duration: 4000
          })
        }
        this.snackBar.open(`Order was placed succesfully`, 'Close', {
          duration: 4000
        })
        this.cartService.clearCart();
        this.router.navigate([GLOBAL_CONSTANTS.routes.LANDING_PAGE])
      })
    } else {
      this.checkoutForm.markAllAsTouched()
    }
  }
}
