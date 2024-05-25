import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private alertDefault = {
    position: 'bottom',
    width: 'auto',
    height: '50px',
  };
  success(message: string) {
    notify({
      message: message,
      type: 'success',
      ...this.alertDefault,
    });
  }
  error(message: string) {
    notify({
      message: message,
      type: 'error',
      ...this.alertDefault,
    });
  }

  constructor() {}
}
