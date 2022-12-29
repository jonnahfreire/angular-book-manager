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
import { AppState, AuthState } from 'src/app/store/models';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignUpFormComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  formStatusChanges!: Subscription;
  passwordsNotMatch: boolean = false;

  classes = {
    form: ["needs-validation"],
    name: ["form-control"],
    email: ["form-control"],
    password: ["form-control"],
    confirmPassword: ["form-control"],
  }

  constructor(
    private authService: AuthService,
    private store: Store<{ app: AppState, auth: AuthState }>,
  ) { }

  get email() {
    return this.signupForm.get('email')!;
  }

  get name() {
    return this.signupForm.get('name')!;
  }

  get password() {
    return this.signupForm.get('password')!;
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword')!;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required]),
    });

    this.formStatusChanges = this.signupForm.statusChanges.subscribe(
      status => {
        if(status.includes("VALID")) {
          this.classes.form =  [this.classes.form[0], "was-validated"];
        }

        if((this.confirmPassword.dirty && 
          this.confirmPassword.value !== this.password.value)) {
          
          this.passwordsNotMatch = true;
          this.classes.confirmPassword = [this.classes.confirmPassword[0], "is-invalid"];
          return;
        } else {
          this.passwordsNotMatch = false;
          this.classes.confirmPassword = [this.classes.confirmPassword[0], "is-valid"];
        }
        
        this.classes.name = this.validateField(status, this.name, "name")
        this.classes.email = this.validateField(status, this.email, "email")
        this.classes.password = this.validateField(status, this.password, "password")
        this.classes.confirmPassword = this.validateField(status, this.confirmPassword, 
          "confirmPassword")
      }
    )
  }

  ngOnDestroy(): void {
    this.formStatusChanges.unsubscribe();
  }

  onSubmit() {
    if(this.signupForm.invalid) {
      this.classes = {
        form: this.classes.form,
        name: this.isAlreadyValid(this.classes.name),
        email: this.isAlreadyValid(this.classes.email),
        password: this.isAlreadyValid(this.classes.password),
        confirmPassword: this.isAlreadyValid(this.classes.confirmPassword),
      }
      return;
    }

    const user = {
      id: 0, 
      name: this.name.value, 
      email: this.email.value, 
      password: this.password.value
    };
    this.authService.signup(user);
  }

  private isAlreadyValid(className: string[]) {
    return [
      className[0],
      !className.includes("is-valid") 
      ? "is-invalid" : "is-valid"
    ]
  }

  private validateField(
    status: FormControlStatus, 
    fieldControl: AbstractControl, 
    fieldControlName: string,
  ) {
    const field = fieldControlName === "name" 
      ? this.classes.name : fieldControlName === "email" 
      ? this.classes.email : fieldControlName === "password" 
      ? this.classes.password : this.classes.confirmPassword;
    
    return status.includes("INVALID") && fieldControl.errors 
          ? [...field, "is-invalid"] 
          : [field[0], "is-valid"]
  }
}
