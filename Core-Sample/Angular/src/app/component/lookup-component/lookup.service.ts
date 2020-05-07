import { Injectable } from '@angular/core';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { HttpHelperService } from 'src/app/shared/services/http-helper.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { env } from 'process';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { LookupModel, Compatablity } from './lookup-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupService extends BaseService {
  private BASE_URL: string;

  constructor(
    private _us: UtilityService,
    private _httpSvc: HttpHelperService) {

    super();
    this.BASE_URL = `${environment.API_URL}/Sample`;
  }


  public getCountries() {
    return this._httpSvc
      .get(`${this.BASE_URL}/GetCountries`, [])
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  public getCarriers(country: string): Observable<string[]> {
    return this._httpSvc.get(`${this.BASE_URL}/GetCarriers`, [{ name: 'country', value: country }]);
  }

  public getBrands(): Observable<string[]> {
    return this._httpSvc.get(`${this.BASE_URL}/GetBrands`, []);
  }

  public getModels(brand: string): Observable<string[]> {
    return this._httpSvc.get(`${this.BASE_URL}/GetModels`, [{ name: 'brand', value: brand }]);
  }

  public getSubModels(brand: string, model: string): Observable<string[]> {
    return this._httpSvc.get(`${this.BASE_URL}/GetSubModels`, [{ name: 'brand', value: brand }, { name: 'model', value: model }]);
  }

  public searchCompatablity(model: LookupModel): Observable<Compatablity> {

    const params = [];

    Object.keys(model).forEach(key => {
      params.push({ name: key, value: model[key] });
    });

    return this._httpSvc.get<Compatablity>(`${this.BASE_URL}/SearchCompatablity`, params);
  }

}
