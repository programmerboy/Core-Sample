import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DeviceModel } from './device.model';
import { DeviceService } from './device.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AddDeviceModalComponent } from 'src/app/shared/modals/add-device-modal/add-device-modal.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  ctrlBrand = new FormControl();
  brands: string[];
  devices: DeviceModel[];

  displayedColumns: string[] = ['phoneModel', 'subModel', 'two_G', 'three_G', 'four_G', 'five_G', 'date_Added'];
  dataSource = new MatTableDataSource<DeviceModel>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _svc: DeviceService,
    private _dialog: MatDialog,
    private _ms: MessagingService,
    private _us: UtilityService) {

  }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getBrands();

    this.ctrlBrand.valueChanges.subscribe(r => this.getDevices(r));
  }

  getBrands() {
    this._svc.getBrands().subscribe((brands: string[]) => {
      this.brands = brands;
    });
  }

  getDevices(brand: string): void {

    this._svc.getDevices(brand).subscribe((devices: DeviceModel[]) => {
      this.devices = devices;
      this.dataSource.data = this.devices;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.paginator) {
      this.paginator.firstPage();
    }

  }

  addDevice() {

    const dialogRef = this._dialog.open(AddDeviceModalComponent, {
      width: '90vw',
      disableClose: true,
      data: {
        title: 'Add'
      }
    });

    const instance = dialogRef.componentInstance;

    instance.title = 'Some Dynamic Title';

    dialogRef.afterClosed().subscribe(r => {

    });

  }

}
