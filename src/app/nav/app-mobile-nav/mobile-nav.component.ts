import {Component, Input} from '@angular/core';
import {GLOBAL_CONSTANTS} from "../../global-constants/global-constants";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductCategory} from "../../models/product_category";
import {User} from "@supabase/supabase-js";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent {
  protected routes = GLOBAL_CONSTANTS.routes;
  @Input()
  public productCategories$!: Observable<ProductCategory[]>
  @Input()
  public cartQuantity$!: BehaviorSubject<number>;
  @Input()
  public user$!: BehaviorSubject<User | null>;
  constructor(private userService: UserService) {
  }
  async handleLogout() {
    await this.userService.logOut();
  }
}
