import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CustomAlertConfig, AlertType } from '../base/base.component';
import { HttpHelperService } from './http-helper.service';
import { LocatorService } from './locator.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { MessagingService } from './messaging.service';

@Injectable()
export class BaseService {

  private _isPendingSubject = new Subject<boolean>();
  public $isPending = this._isPendingSubject.asObservable();

  private _alertSubject = new Subject<CustomAlertConfig>();
  public $alert = this._alertSubject.asObservable();


  private _disableSubject = new Subject<boolean>();
  public $disableSubject = this._disableSubject.asObservable();

  // protected members
  protected httpHelperService: HttpHelperService;
  protected messagingService: MessagingService;

  constructor() {
    this.httpHelperService = LocatorService.injector.get(HttpHelperService);
    this.messagingService = LocatorService.injector.get(MessagingService);

    this.httpHelperService.$pendingRequestCount
      .pipe(distinctUntilChanged())
      .subscribe((pendingRequestCount: any) => {
        this._isPendingSubject.next(pendingRequestCount !== 0);
      });

    this.httpHelperService.$disableInteractionSubject
      .pipe(distinctUntilChanged())
      .subscribe((disableInteraction) => this._disableSubject.next(disableInteraction));

    this.messagingService.$alert
      .subscribe((alert: any) => {
        this._alertSubject.next(alert);
      });
  }

  public downloadFile(blob: Blob, fileName: string) {
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    }
  }
}
