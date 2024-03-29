import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ALERTS, Alert } from '../../../shared/models/Alert';


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
  @Input()
  ticker: string = '';
  @Input() triggerCounter: number = 0;

  alert: Alert = this.setAlert('undefined');

  constructor() { }

  ngOnInit(): void {
    this.alert = this.setAlert(this.condition);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.triggerCounter && changes.visible && changes.visible.currentValue === true) {
      this.alert = this.setAlert(this.condition);

      // dismiss after 5s
      setTimeout(() => {
        this.visible = false;
      }, 5000);
    }

    // if condition change, update alert
    if (changes.condition) {
      this.alert = this.setAlert(this.condition);
    }
  }

  setAlert(condition: string): Alert{
    const alertItem = ALERTS.find(alert => alert.condition === condition);
    return alertItem ? alertItem : ALERTS[-1];
  }

  close(alert: Alert) {
    this.visible = false;
	}
}
