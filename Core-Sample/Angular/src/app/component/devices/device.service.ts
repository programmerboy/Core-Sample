import { Injectable } from '@angular/core';
import { DeviceModel } from './device.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { HttpHelperService } from 'src/app/shared/services/http-helper.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends BaseService {

  private BASE_URL: string;

  constructor(
    private _us: UtilityService,
    private _httpSvc: HttpHelperService) {

    super();

    this.BASE_URL = `${environment.API_URL}/Sample`;
  }

  public getBrands(): Observable<string[]> {
    return this._httpSvc.get(`${this.BASE_URL}/GetBrands`, []);
  }

  public getDevices(brand: string): Observable<DeviceModel[]> {
    return this._httpSvc.get(`${this.BASE_URL}/GetDevices`, [{ name: 'brand', value: brand }]);
  }

}
