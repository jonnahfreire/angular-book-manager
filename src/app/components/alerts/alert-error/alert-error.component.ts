import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-error',
  templateUrl: './alert-error.component.html',
})
export class AlertErrorComponent {
  @Input() message!: string;
}
