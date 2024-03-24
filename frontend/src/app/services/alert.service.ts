import { Injectable } from '@angular/core';
import { ALERTS, Alert } from '../shared/models/Alert';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert: Alert = this.setAlert('undefined');
  // private IsAlertSubject = new BehaviorSubject<boolean>(false);

  
  constructor() { }

  setAlert(condition: string): Alert{
    const alertItem = ALERTS.find(alert => alert.condition === condition);
    return alertItem ? alertItem : ALERTS[-1];
  }

  // showAlert(condition: string){
  //   this.alert = this.setAlert(condition);
  //   this.IsAlertSubject.next(true);
  // }
}
