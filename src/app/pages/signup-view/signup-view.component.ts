import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {Router, RouterLink} from "@angular/router";
import {UserForm} from "../../models/forms";
import {GLOBAL_CONSTANTS} from "../../global-constants/global-constants";
import {SupabaseService} from "../../services/supabase.service";
import {UserDTO} from "../../models/userDTO";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup-view',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.scss'],
  providers: [MatSnackBar]
})
export class SignupViewComponent {

  protected hidePassword: boolean = true;
  protected isLoading: boolean = false;
  protected form: FormGroup<UserForm> = this.getNewUserForm();

  constructor(private readonly supabaseService: SupabaseService,
              private readonly snackBar: MatSnackBar,
              private readonly router: Router) {
  }

  submit() {
    this.supabaseService.getSupaBase().auth.signUp(this.form.value as UserDTO)
      .then(authTokenResponse => {
        if (authTokenResponse.error === null) {
          this.snackBar.open('Account was created successfully, please verify your email to activate', 'Close', {
            duration: 3000,
            panelClass: 'snackbar-success'
          })
          this.router.navigate([`${GLOBAL_CONSTANTS.routes.LOGIN}`])
        } else {
          this.snackBar.open(authTokenResponse.error.message, 'Close', {
            duration: 3000,
            panelClass: 'snackbar-error'
          })
        }
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
