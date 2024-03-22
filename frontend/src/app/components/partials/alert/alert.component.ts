import { Component, Input, OnInit } from '@angular/core';
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



export class AlertComponent implements OnInit{
  @Input()
  visible: boolean = false;
  @Input()
  condition: string = '';

  alert: Alert;

  constructor(private alertService:AlertService) { this.alert = this.alertService.setAlert(this.condition); }

  ngOnInit(): void {
    this.alert = this.alertService.setAlert(this.condition);
  }

  ngOnChanges(condition: string): void {
    // Check if 'condition' input has changed
    if (condition) {
      this.alert = this.alertService.setAlert(this.condition);
    }
  }

  close(alert: Alert) {
		// this.alert.splice(this.alert.indexOf(alert), 1);
	}
}
