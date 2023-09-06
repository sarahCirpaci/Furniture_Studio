import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {OrderDTO} from "../../models/orderDTO";
import {MatTableModule} from "@angular/material/table";
import {Router} from "@angular/router";
import {GLOBAL_CONSTANTS} from "../../global-constants/global-constants";

@Component({
  selector: 'app-my-account-view',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './my-account-view.component.html',
  styleUrls: ['./my-account-view.component.scss']
})
export class MyAccountViewComponent {
  orders$: Observable<OrderDTO[]> = new Observable<OrderDTO[]>()
  userEmail: string | null | undefined;
  constructor(private userService: UserService,
              private router: Router) {
    const userFromLocalStorage = this.userService.getUserFromLocalStorage();
    if(userFromLocalStorage !== null) {
      this.orders$ = this.userService.getOrders(userFromLocalStorage.id);
    } else {
      this.router.navigate([GLOBAL_CONSTANTS.routes.LANDING_PAGE])
    }
    this.userEmail = this.userService.getUserEmailFromLocalStorage()?.replaceAll('"', '');
  }


}
