import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginFormComponent } from './login/login-form.component';
import { SignUpFormComponent } from './signup/signup-form.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    SignUpFormComponent
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [ 
    LoginFormComponent, 
    SignUpFormComponent
  ]
})
export class LibraryFormsModule { }
