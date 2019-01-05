import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Base } from '../resources/common/base-url';

@Injectable()
export class AddJewellService{
    constructor(private _http:HttpClient){}
    base:Base= new Base();
    loadItems(param):Observable<any>{
        return this._http.post(this.base.getBaseUrl()+"/getItems",param);
    }

    getItemCategories():Observable<any>{
        return this._http.post(this.base.getBaseUrl()+"/getItemCategories",{});
    }
    getSubtypeDetails():Observable<any>{
        return this._http.post(this.base.getBaseUrl()+"/getSubtypeDetails",{});
    }
    getDealerDetails():Observable<any>{
        return this._http.post(this.base.getBaseUrl()+"/getDealerDetails",{});
    }
}