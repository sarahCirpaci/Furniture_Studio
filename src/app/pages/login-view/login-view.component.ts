import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {UserForm} from "../../models/forms";
import {Router, RouterLink} from "@angular/router";
import {GLOBAL_CONSTANTS} from "../../global-constants/global-constants";
import {UserDTO} from "../../models/userDTO";
import {SupabaseService} from "../../services/supabase.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatProgressBarModule, MatButtonModule, RouterLink],
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  providers: [MatSnackBar]
})
export class LoginViewComponent {

  protected hidePassword: boolean = true;
  protected isLoading: boolean = false;
  protected form: FormGroup<UserForm> = this.getNewUserForm();

  constructor(private readonly supabaseService: SupabaseService,
              private readonly snackBar: MatSnackBar,
              private readonly router: Router,
              private readonly userService: UserService) {
  }

  submit() {
    this.isLoading = true;
    this.supabaseService.getSupaBase().auth.signInWithPassword(this.form.value as UserDTO)
      .then(authTokenResponse => {
        this.userService.logInUser(authTokenResponse);
        this.isLoading = false;
      })
  }

  getNewUserForm() {
    return new FormGroup<UserForm>({
      email: new FormControl(''),
      password: new FormControl(''),
    })
  }

  protected readonly routes = GLOBAL_CONSTANTS.routes;
}
