import { Component } from '@angular/core';
import { Alert } from '../../../shared/models/Alert';
import { AlertService } from '../../../services/alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css', 
  styles: `
			.alert-custom {
				color: #99004d;
				background-color: #f169b4;
				border-color: #800040;
			}
		`,
})



export class AlertComponent {
  alert: Alert = new Alert('undefined', 'undefined', 'undefined', false);

  constructor(private alertService:AlertService) {
    this.alert = alertService.setAlert('undefined');
  }

  close(alert: Alert) {
		// this.alert.splice(this.alert.indexOf(alert), 1);
	}
}
