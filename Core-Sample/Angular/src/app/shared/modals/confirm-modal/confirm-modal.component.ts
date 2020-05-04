import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})

export class ConfirmModalComponent implements OnInit {

  title: string;
  text: string;
  yesText: string;
  noText: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.title = this.data.title || 'Confirm';
    this.text = this.data.text || 'Are you sure you want to delete?';
    this.yesText = this.data.yesText || 'Yes';
    this.noText = this.data.noText || 'No';
  }

}
