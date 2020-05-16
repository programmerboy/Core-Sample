import { Component, OnInit } from '@angular/core';
import { LookupService } from './lookup.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { LookupModel, LookupModelError, Compatablity as CompatablityModel } from './lookup.model';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { flyInOutAnimation } from 'src/app/shared/animations/flyInOutAnimation';

@Component({
  selector: 'app-lookup-component',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
  animations: [flyInOutAnimation]
})
export class LookupComponent implements OnInit {

  countries: string[];
  carriers: string[];
  brands: string[];
  phoneModels: string[];
  subModels: string[];

  searchForm: FormGroup;
  sm: LookupModel;
  error: LookupModelError;
  searchedCarrierName: string;
  searchedDeviceName: string;
  isSearched: boolean;
  compModel: CompatablityModel;

  constructor(
    private _svc: LookupService,
    private _ms: MessagingService,
    private _us: UtilityService) {

    this.sm = new LookupModel();

  }

  ngOnInit() {

    this.sm = new LookupModel();

    this.reset();

  }

  public getCarriers() {

    this._svc.getCarriers(this.sm.country).subscribe(list => {
      this.carriers = list;
    }, this._handleError);
  }

  public getModels() {

    this._svc.getModels(this.sm.brand).subscribe(list => {
      this.phoneModels = list;
      this.subModels = [];
      this.sm.phoneModel = '';
      this.sm.subModel = '';
    }, this._handleError);
  }

  public getSubModels() {

    this._svc.getSubModels(this.sm.brand, this.sm.phoneModel).subscribe(list => {
      this.subModels = list;
      this.sm.subModel = '';
    }, this._handleError);
  }

  public reset() {

    this._initFields();

    this.sm = new LookupModel();

    this._svc.getCountries().subscribe(list => { this.countries = list; }, this._handleError);
    this._svc.getBrands().subscribe(list => { this.brands = list; }, this._handleError);

  }

  public search() {

    if (!this.sm.country || !this.sm.carrierName || !this.sm.brand || !this.sm.phoneModel) {
      this._ms.showSnackBar('All fields except sub-model are required.');
      return;
    }

    if (this.subModels.length && !this.sm.subModel) {
      this._ms.showSnackBar('Please select a sub-model.');
      return;
    }

    this.searchedDeviceName = `${this.sm.brand} ${this.sm.phoneModel} ${this.sm.subModel}`;
    this.searchedCarrierName = `${this.sm.carrierName}`;

    this._svc.searchCompatablity(this.sm).subscribe((resp: CompatablityModel) => {
      this.isSearched = true;
      this.compModel = resp;
      console.log(resp);
    }, e => {
      this.isSearched = false;
      this._handleError(e);
    });

  }

  public showDeviceFreq() {
    const msg = `<strong>2G:</strong> ${this.compModel.deviceFrequencies.two_G}<br />
    <strong>3G:</strong> ${this.compModel.deviceFrequencies.three_G}<br />
    <strong>4G:</strong> ${this.compModel.deviceFrequencies.four_G}<br />
    <strong>5G:</strong> ${this.compModel.deviceFrequencies.five_G}`;

    this._ms.showToast(msg, null, 'Device Frequencies');
  }

  public showCareerFreq() {
    const msg = `<strong>2G:</strong> ${this.compModel.carrierFrequencies.two_G}<br />
    <strong>3G:</strong> ${this.compModel.carrierFrequencies.three_G}<br />
    <strong>4G:</strong> ${this.compModel.carrierFrequencies.four_G}<br />
    <strong>5G:</strong> ${this.compModel.carrierFrequencies.five_G}`;

    this._ms.showToast(msg, null, 'Carrier Frequencies');
  }

  private _initFields() {

    this.countries = [];
    this.carriers = [];
    this.brands = [];
    this.phoneModels = [];
    this.subModels = [];
  }

  private _handleError = (error: string) => {
    this._ms.handleError(error);

  }

}
