import { Component, OnInit, Inject } from '@angular/core';
import { DeviceModel, DeviceModelError } from 'src/app/component/devices/device.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UtilityService } from '../../services/utility.service';
import { DeviceService } from 'src/app/component/devices/device.service';
import { MessagingService } from '../../services/messaging.service';
import { StringValidators } from '../../validators/string-validators';
import { NumberValidators } from '../../validators/number-validators';
import { debounceTime, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-device-modal',
  templateUrl: './add-device-modal.component.html',
  styleUrls: ['./add-device-modal.component.scss']
})
export class AddDeviceModalComponent implements OnInit {

  // Properties which can be set outside
  public title: string;
  public addEditModel: DeviceModel;
  private tempModel: DeviceModel;

  public addEditForm: FormGroup;
  public error: DeviceModelError;
  brands: string[];
  filteredOptions: any;

  constructor(
    public dialogRef: MatDialogRef<AddDeviceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRefConfirm: MatDialog,
    private _fb: FormBuilder,
    private _us: UtilityService,
    private _svc: DeviceService,
    private _ms: MessagingService,
  ) { }

  // convenience getter for easy access to form fields
  get f() { return this.addEditForm.controls; }

  ngOnInit() {

    this.addEditModel = this.data.addEditModel ? this.data.addEditModel : new DeviceModel();

    this.addEditForm = this._fb.group({
      brand: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      phoneModel: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      subModel: ['', [Validators.minLength(2), Validators.maxLength(200)]],
      two_G: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      three_G: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      four_G: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(600)]],
      five_G: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(600)]],
    });

    this.error = new DeviceModelError();

    const ctrlObjects: any = {};

    Object.keys(this.addEditModel).forEach(key => {

      const frmCtrl = this.addEditForm.get(key);

      if (frmCtrl) {
        ctrlObjects[key] = frmCtrl;
        ctrlObjects[key].valueChanges.pipe(debounceTime(1000)).subscribe(value =>
          this.error[key] = this._us.getValidationMessages(ctrlObjects[key]));
      }

    });

    this.addEditForm.patchValue(this.addEditModel);

    this._svc.getBrands().subscribe(r => {
      this.brands = r;
      this.filteredOptions = r; // needed if you want to show all options on 1st click
    });

    // this.filteredOptions = this.f.brand.valueChanges.pipe(startWith(''), map(value => this._filter(value)));

    this.f.brand.valueChanges.pipe(startWith(''), map(value => this._filter(value))).subscribe(acBrands => {
      this.filteredOptions = acBrands;
    });

  }

  private _filter(value: string): string[] {

    if (!this.brands) {
      return [];
    }

    const filterValue = value.toLowerCase();
    return this.brands.filter(option => option.toLowerCase().includes(filterValue));
  }

  public process() {

    this.tempModel = JSON.parse(JSON.stringify(this.addEditModel));

    Object.assign(this.tempModel, this.addEditForm.getRawValue());

    const device = `${this.tempModel.brand} ${this.tempModel.phoneModel} ${this.tempModel.subModel}`.trim();

    const msg = `Are you sure you want to add <strong>"${device}"</strong>?`;

    this._us.confirmModal('Add Device', msg).subscribe((isConfirmed: boolean) => {

      if (isConfirmed) {
        this._ms.showSnackBar(`${device} is successfully added.`);
      }

    });
  }


}
