import { Component, OnDestroy, OnInit } from '@angular/core';
import { 
  AbstractControl, 
  FormControl, 
  FormControlStatus, 
  FormGroup, 
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthResponseWithError } from 'src/app/services/auth/AuthResponse';
import { setAuthState } from 'src/app/store/app.actions';
import { selectBooksByUserId } from 'src/app/store/app.selectors';
import { AppState, AuthState, User } from 'src/app/store/models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  formStatusChanges!: Subscription;

  classes = {
    form: ["needs-validation"],
    email: ["form-control"],
    password: ["form-control"],
  }
  
  constructor(
    private authService: AuthService,
    private store: Store<{ app: AppState, auth: AuthState }>
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required]),
    });

    this.formStatusChanges = this.loginForm.statusChanges.subscribe(
      status => {
        if(status.includes("VALID")) {
          this.classes.form =  [...this.classes.form, "was-validated"] 
        }
        
        this.classes.email = this.validateField(status, this.email, "email")
        this.classes.password = this.validateField(
          status, this.password, "password")
      }
    )
  }

  ngOnDestroy(): void {
    this.formStatusChanges.unsubscribe();
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      this.classes = {
        form: this.classes.form,
        email: [...this.classes.email, "is-invalid"],
        password: [...this.classes.password, "is-invalid"],
      }
      return;
    }

    const response = this.authService
      .signin(this.email.value, this.password.value);
    
    if(!response.error) {
      const user: User = response.data!;

      this.store.select(selectBooksByUserId(user!.id))  
      .subscribe(books => {
        this.store.dispatch(
          setAuthState({ 
            payload: { 
              user, 
              books, 
              logged: true 
            } 
          }));
      });
    } else {
      this.validateAccountField(response, "email");
      this.validateAccountField(response, "password");
    }
  }

  private validateAccountField(response: AuthResponseWithError, fieldName: string) {
    if(response.error) {
      this.store.dispatch(setAuthState({
        payload: {
          authError: {
            error: true,
            message: response.message!
          }
        }
      }))
      
      this.classes = {
        email: response.fields.includes("email") 
          ? [this.classes.email[0], "is-invalid"]
          : this.classes.email,

        password: response.fields.includes("password") 
          ? [this.classes.password[0], "is-invalid"] 
          : this.classes.password,

        form: [this.classes.form[0]]
      }
    }
  }
  
  private validateField(
    status: FormControlStatus, 
    fieldControl: AbstractControl, 
    fieldControlName: string,
  ) {
    const field = fieldControlName === "email" 
      ? this.classes["email"] : this.classes["password"];
    
    return status.includes("INVALID") && fieldControl.errors 
          ? [...field, "is-invalid"] 
          : [field[0], "is-valid"]
  }
}
