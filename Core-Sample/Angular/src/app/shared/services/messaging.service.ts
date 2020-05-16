import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomAlertConfig, AlertType } from '../base/base.component';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';
import { ToastModalComponent } from '../modals/toast-modal/toast-modal.component';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private _alertSubject = new Subject<CustomAlertConfig>();
  public $alert = this._alertSubject.asObservable();

  constructor(private _sb: MatSnackBar) { }

  public setAlert(message: string, type: AlertType = AlertType.Warning, timeout?: number, showAlert: boolean = true) {

    if (!timeout) {
      timeout = 20000;
    }

    this._alertSubject.next(new CustomAlertConfig(message, type, timeout, showAlert));
  }

  public hideAlert() {
    const alert = new CustomAlertConfig();
    alert.timeout = 0;
    this._alertSubject.next(alert);
  }

  public onAlertClosed(alert: CustomAlertConfig) {
    this._alertSubject.next(alert);
  }

  public handleError = (msg: string = 'Error Occured') => {
    this.setAlert(msg, AlertType.Error);
  }

  public showSnackBar(message: string, action = null, config = null) {
    return this._sb.open(message, action, config || { duration: 5000 });
  }

  // tslint:disable-next-line:max-line-length
  public showToast(message: string, type?: AlertType, title?: string, teaser: string = '', timeout?: number,
    vPos?: MatSnackBarVerticalPosition, hPos?: MatSnackBarHorizontalPosition) {

    const ref = this._sb.openFromComponent(ToastModalComponent,
      {
        panelClass: 'no-background',
        duration: timeout || 30000,
        verticalPosition: vPos || 'top',
        horizontalPosition: hPos || 'right',
        data: {
          title: title || 'Notification',
          type: type || AlertType.Info,
          message: message,
          teaser: teaser
        }
      });
  }

}
