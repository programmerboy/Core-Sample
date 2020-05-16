import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { AlertType } from '../../base/base.component';

@Component({
  selector: 'app-toast-modal',
  templateUrl: './toast-modal.component.html',
  styleUrls: ['./toast-modal.component.scss']
})
export class ToastModalComponent implements OnInit {
  title: any;
  teaser: any;
  message: any;
  isSuccess: boolean;
  isInfo: boolean;
  isWarning: boolean;
  isError: boolean;

  constructor(private snackBarRef: MatSnackBarRef<ToastModalComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    this.title = this.data.title;
    this.teaser = this.data.teaser;
    this.message = this.data.message;

    this.isSuccess = this.data.type === AlertType.Success;
    this.isInfo = this.data.type === AlertType.Info;
    this.isWarning = this.data.type === AlertType.Warning;
    this.isError = this.data.type === AlertType.Error;

  }

  closeToast() {
    this.snackBarRef.dismiss();
  }

}
