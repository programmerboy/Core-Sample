import { Component, OnInit } from '@angular/core';
import { LookupService } from './lookup.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { LookupModel, LookupModelError, Compatablity as CompatablityModel } from './lookup-model';
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
  models: string[];
  subModels: string[];

  searchForm: FormGroup;
  sm: LookupModel;
  error: LookupModelError;
  searchedCarrierName: string;
  searchedDeviceName: string;
  isSearched: boolean;
  compModel: CompatablityModel;

  constructor(
    private _fb: FormBuilder,
    private _svc: LookupService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _ar: ActivatedRoute,
    private _ms: MessagingService,
    private _us: UtilityService) {

    this.sm = new LookupModel();

  }

  // convenience getter for easy access to form fields
  get f() { return this.searchForm.controls; }

  ngOnInit() {

    this.sm = new LookupModel();

    this.searchForm = this._fb.group({
      country: [{ value: '', disabled: false }, [Validators.required]],
      carrierName: [{ value: '' }, [Validators.required]],
      brand: ['', [Validators.required]],
      phoneModel: ['', [Validators.required]],
      subModel: [''],
    });

    this.reset();

    this.error = new LookupModelError();

    const ctrlObjects: any = {};

    Object.keys(this.sm).forEach(key => {

      const frmCtrl = this.searchForm.get(key);

      if (frmCtrl) {
        ctrlObjects[key] = frmCtrl;

        ctrlObjects[key].valueChanges.pipe(debounceTime(1000)).subscribe(value =>
          this.error[key] = this._us.getValidationMessages(ctrlObjects[key]));
      }

    });

    // model changes

    this.f.country.valueChanges.pipe(
      tap((r) => this.carriers = []),
      filter((r) => r.length > 1)
    ).subscribe(r => this.getCarriers());

    this.f.brand.valueChanges.pipe(
      tap((r) => this.models = []),
      filter((r) => r.length > 1)
    ).subscribe(r => this.getModels());

    this.f.phoneModel.valueChanges.pipe(
      tap((r) => this.subModels = []),
      filter((r) => r.length > 1)
    ).subscribe(r => this.getSubModels());


  }

  public getCarriers() {
    this._svc.getCarriers(this.f.country.value).subscribe(list => {
      this.carriers = list;
      list.length ? this.f.carrierName.enable() : this.f.carrierName.disable();
    }, this._handleError);
  }

  public getModels() {
    this._svc.getModels(this.f.brand.value).subscribe(list => {
      this.models = list;
      list.length ? this.f.phoneModel.enable() : this.f.phoneModel.disable();
    }, this._handleError);
  }

  public getSubModels() {
    this._svc.getSubModels(this.f.brand.value, this.f.phoneModel.value).subscribe(list => {
      this.subModels = list;
      list.length ? this.f.subModel.enable() : this.f.subModel.disable();
    }, this._handleError);
  }

  public reset() {

    this._initFields();

    this._svc.getCountries().subscribe(list => { this.countries = list; }, this._handleError);
    this._svc.getBrands().subscribe(list => { this.brands = list; }, this._handleError);


    this.searchForm.patchValue(this.sm);

  }

  public search() {

    this.isSearched = true;

    const tempModel = JSON.parse(JSON.stringify(this.sm));

    Object.assign(tempModel, this.searchForm.getRawValue());

    this.searchedDeviceName = `${this.f.brand.value} ${this.f.phoneModel.value} ${this.f.subModel.value}`;
    this.searchedCarrierName = `${this.f.carrierName.value}`;

    this._svc.searchCompatablity(tempModel).subscribe((resp: CompatablityModel) => {
      this.compModel = resp;
    }, e => {
      this.isSearched = false;
      this._handleError(e);
    });

  }

  public showDeviceFreq() {

  }

  public showCareerFreq() {

  }

  private _initFields() {

    this.f.carrierName.disable();
    this.f.phoneModel.disable();
    this.f.subModel.disable();

    this.countries = [];
    this.carriers = [];
    this.brands = [];
    this.models = [];
    this.subModels = [];
  }

  private _handleError = (error: string) => {
    this._ms.handleError(error);

  }

}
