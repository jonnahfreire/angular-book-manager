import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
})
export class AlertSuccessComponent {
  @Input() message!: string;
}
