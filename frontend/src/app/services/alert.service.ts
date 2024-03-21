import { Injectable } from '@angular/core';
import { ALERTS, Alert } from '../shared/models/Alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert: Alert = this.setAlert('undefined');

  
  constructor() { }

  setAlert(condition: string): Alert{
    const alertItem = ALERTS.find(alert => alert.condition === condition);
    return alertItem ? alertItem : ALERTS[-1];
  }
}
