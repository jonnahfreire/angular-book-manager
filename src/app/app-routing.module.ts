import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './components/forms/login/login-form.component';
import { SignUpFormComponent } from './components/forms/signup/signup-form.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  { 
    path: '', 
    component: IndexComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: "full" },
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignUpFormComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
