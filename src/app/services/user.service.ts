import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthTokenResponse, User} from "@supabase/supabase-js";
import {GLOBAL_CONSTANTS} from "../global-constants/global-constants";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {SupabaseService} from "./supabase.service";
import {OrderDTO} from "../models/orderDTO";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userEmail$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)

  constructor(private readonly snackBar: MatSnackBar,
              private readonly router: Router,
              private supabaseService: SupabaseService) {
    this.userEmail$.next(this.getUserEmailFromLocalStorage());
    this.user$.next(this.getUserFromLocalStorage());
  }

  logInUser(authTokenResponse: AuthTokenResponse) {
    localStorage.setItem(GLOBAL_CONSTANTS.USER, JSON.stringify(authTokenResponse.data.user))
    localStorage.setItem(GLOBAL_CONSTANTS.USER_EMAIL, JSON.stringify(authTokenResponse.data.user?.email))
    this.user$.next(authTokenResponse.data.user);
    this.userEmail$.next(authTokenResponse.data.user?.email ?? '')
    if (authTokenResponse.error === null) {
      this.snackBar.open('Authenticated!', 'Close', {
        duration: 3000,
        panelClass: 'snackbar-success'
      })
      this.router.navigate([`${GLOBAL_CONSTANTS.routes.LANDING_PAGE}`])
    } else {
      this.snackBar.open(authTokenResponse.error.message, 'Close', {
        duration: 3000,
        panelClass: 'snackbar-error'
      })
    }
  }

  async logOut() {
    localStorage.removeItem(GLOBAL_CONSTANTS.USER)
    localStorage.removeItem(GLOBAL_CONSTANTS.USER_EMAIL)
    await this.supabaseService.getSupaBase().auth.signOut()
    this.user$.next(null);
    this.userEmail$.next(null);
    this.router.navigate([`${GLOBAL_CONSTANTS.routes.LOGIN}`])
  }

  getUserFromLocalStorage(): User | null {
    const user = localStorage.getItem(GLOBAL_CONSTANTS.USER)
    if (user) {
      return JSON.parse(user)
    } else {
      return null
    }
  }

  getUserEmailFromLocalStorage(): string | null {
    return localStorage.getItem(GLOBAL_CONSTANTS.USER_EMAIL) ?? null;
  }

  getOrders(userId: string): Observable<OrderDTO[]> {
    return new Observable<OrderDTO[]>((observer) => {
      this.supabaseService.getSupaBase().from(GLOBAL_CONSTANTS.ORDER)
        .select("*", {count: "exact"})
        .eq('user_id', userId)
        .then((result) => {
        if (result.data) {
          observer.next(result.data);
          observer.complete();
        } else {
          observer.error(new Error('Products not found'));
          return;
        }
      })
    })
  }
}
