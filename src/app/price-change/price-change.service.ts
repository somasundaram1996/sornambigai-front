import { Observable } from 'rxjs';
import { Base } from './../resources/common/base-url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemModel } from '../add-jewell/add-jewell.component';

@Injectable({
  providedIn: 'root'
})
export class PriceChangeService {
  constructor(private _http:HttpClient){}
  base:Base= new Base();
  getItemCategories():Observable<any>{
      return this._http.post(this.base.getBaseUrl()+"/auth/getItemCategories",{});
  }

  updatePrice(param) {
    return this._http.post(this.base.getBaseUrl()+"/auth/updatePrice",param);
  }
}
