import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertErrorComponent } from './alert-error/alert-error.component';
import { AlertSuccessComponent } from './alert-success/alert-success.component';


@NgModule({
  declarations: [
    AlertSuccessComponent,
    AlertErrorComponent
  ],
  imports: [CommonModule],
  exports: [
    AlertSuccessComponent,
    AlertErrorComponent
  ]
})
export class AlertsModule { }
