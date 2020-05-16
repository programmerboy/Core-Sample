import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { timeout } from 'q';
import { finalize, skip, takeUntil } from 'rxjs/operators';
import { interval, timer, Observable, from } from 'rxjs';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagingService } from './messaging.service';

@Injectable()
export class UtilityService {

  constructor(private _dialog: MatDialog, private _ms: MessagingService) { }

  public validationMessages(c: AbstractControl): { [key: string]: string } {
    const msgs: any = {};
    const currentErrors: ValidationErrors = c.errors;

    if (currentErrors) {

      if (currentErrors.required) {
        msgs.required = 'This is a required field.';
      }

      if (currentErrors.pattern) {
        msgs.pattern = 'Please enter a valid email address.';
      }

      if (currentErrors.email) {
        msgs.email = 'Please enter a valid email address.';
      }

      if (currentErrors.website) {
        msgs.website = 'Please enter a valid URL.';
      }

      if (currentErrors.minlength) {
        msgs.minlength = `Cannot be less than ${currentErrors.minlength.requiredLength} characters.`;
      }

      if (currentErrors.maxlength) {
        msgs.maxlength = `Cannot be more than ${currentErrors.maxlength.requiredLength} characters.`;
      }

      if (currentErrors.range) {
        msgs.range = `Should be within the range.`;
      }

      if (currentErrors.notMatched) {
        msgs.notMatched = `Values do not match.`;
      }

      if (currentErrors.outOfRange) {
        msgs.outOfRange = `Value doesn't fall within range.`;
      }
    }

    return msgs;
  }

  public getValidationMessages(c: AbstractControl): string {
    let validationMsg = null;

    const controlValidationMsgs = this.validationMessages(c);

    if ((c.touched || c.dirty) && c.errors) {
      validationMsg = Object.keys(c.errors).map(key => {
        // console.log(`controlValidationMsgs[key] ${controlValidationMsgs[key]} | ${key}`);
        return controlValidationMsgs[key];
      }).join(' ');
    }

    return validationMsg;
  }

  public recreateObject<T>(source: T): T {
    if (source && typeof source === 'object') {
      return <T>JSON.parse(JSON.stringify(source));
    } else {
      return source;
    }
  }

  public getDateString(dt: Date): string {

    if (!dt || Object.prototype.toString.call(dt) !== '[object Date]') {
      return '';
    }

    const strDate = `${('0' + (dt.getMonth() + 1)).slice(-2)}/${('0' + dt.getDate().toString()).slice(-2)}/${dt.getFullYear()}`;
    return strDate;
  }

  public getTimeStamp(): string {
    const ts = new Date();
    const timeStamp = `${('0' + (ts.getMonth() + 1)).slice(-2)}-${('0' + ts.getDate().toString()).slice(-2)}-${ts.getFullYear()}-${ts.getHours()}${ts.getMinutes()}${ts.getSeconds()}`;
    return timeStamp;
  }

  public isTruthy(value: any): boolean {
    let bln;

    if (value === null || typeof (value) === 'undefined') {
      bln = false;
    } else if (typeof (value) === 'number' || typeof (value) === 'object') {
      bln = true;
    } else if (typeof (value) === 'string' && value) {
      bln = true;
    } else {
      bln = false;
    }

    console.log(`${value} | ${typeof (value)} | ${bln}`);

    return bln;
  }

  public duplicateObject(source: any, dest: any): any {
    const newObject = {};

    Object.keys(source).forEach(key => {
      if (dest.hasOwnProperty(key)) {
        newObject[key] = source[key];
      }
    });

    return newObject;
  }

  public setTimer(seconds: number, func: any) {

    const source$ = interval(1000);
    const timer$ = timer((seconds + 1) * 1000);

    const obs$ = source$.pipe(
      skip(0),
      takeUntil(timer$),
      finalize(func)
    );

    return obs$;
  }

  public confirmModal(title: string, text: string): Observable<boolean> {

    const dialogRef = this._dialog.open(ConfirmModalComponent, {
      data: { title: title, text: text }
    });

    return dialogRef.afterClosed();
  }

  public getParameterByName(name, url) {
    if (!url) { url = window.location.href; }

    name = name.replace(/[\[\]]/g, '\\$&');

    const regex = new RegExp('[?&]' + name.toLowerCase() + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url.toLowerCase());

    if (!results) { return null; }
    if (!results[2]) { return ''; }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  public isBetween(n, a, b) {
    return (n - a) * (n - b) <= 0;
  }

  public getOffSets(element) {
    let top = 0,
      left = 0;

    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top: top,
      left: left
    };
  }

  public getBrowserInfo() {
    let ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];

    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: 'IE', version: tem[1] || '' };
    } else if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);

      if (tem != null) {
        return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
      }
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1]);
    }

    return { name: M[0], version: M[1] };
  }

  public copyToClipboard(strText: string) {

    let success = true;

    const temp = document.createElement('input');
    document.body.prepend(temp);

    temp.value = strText;
    temp.select();

    try {
      success = document.execCommand('copy');
    } catch (ex) {
      success = false;
    }
    finally {
      document.body.removeChild(temp);
    }

    if (success) {
      this._ms.showSnackBar(`Copied data.`);
    } else {
      this._ms.showSnackBar(`Unable to Copy data.`);
    }

    return success;

  }


}
