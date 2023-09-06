import {Component, Input} from '@angular/core';
import {GLOBAL_CONSTANTS} from "../../global-constants/global-constants";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductCategory} from "../../models/product_category";
import {User} from "@supabase/supabase-js";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.component.html',
  styleUrls: ['./desktop-nav.component.scss']
})
export class DesktopNavComponent {

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
