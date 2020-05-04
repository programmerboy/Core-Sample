import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { flyInOutAnimation } from '../animations/flyInOutAnimation';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  animations: [flyInOutAnimation]
})
export class BaseComponent implements OnChanges {

  @Input() alert: CustomAlertConfig;
  @Input() isPending: boolean;
  @Input() disableInteraction: boolean;
  @Output() onClose: EventEmitter<CustomAlertConfig>;

  public isSuccess: boolean;
  public isWarning: boolean;
  public isError: boolean;
  public isInfo: boolean;
  backDropHeight = 800;

  constructor() {
    this.onClose = new EventEmitter<CustomAlertConfig>();
  }

  public ngOnChanges(changes: SimpleChanges): void {

    if (changes.alert && changes.alert.currentValue) {

      this.isSuccess = this.alert.type === AlertType.Success;
      this.isWarning = this.alert.type === AlertType.Warning;
      this.isError = this.alert.type === AlertType.Error;
      this.isInfo = this.alert.type === AlertType.Info;

      setTimeout(() => this.closeAlert(this.alert), this.alert.timeout);
    }

    if (changes.disableInteraction && changes.disableInteraction.currentValue) {
      this.backDropHeight = document.getElementsByTagName('body')[0].scrollHeight;
    }

  }

  public closeAlert(event: CustomAlertConfig) {
    this.alert.showAlert = false;
    this.onClose.emit(this.alert);
  }
}

export enum AlertType {
  Success,
  Error,
  Warning,
  Info
}

export class CustomAlertConfig {
  constructor(
    public message: string = '',
    public type: AlertType = AlertType.Info,
    public timeout: number = 10000,
    public showAlert: boolean = false
  ) { }
}
