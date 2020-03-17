import { map, debounceTime } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Base } from '../resources/common/base-url';
import { ItemModel } from './add-jewell.component';

@Injectable()
export class AddJewellService{
    constructor(private _http:HttpClient){}
    base:Base= new Base();
    loadItems(param):Observable<ItemModel[]>{
        return this._http.post<ItemModel[]>(this.base.getBaseUrl()+"/auth/getItems",param);
    }

    getItemCategories():Observable<any>{
        return this._http.post(this.base.getBaseUrl()+"/auth/getItemCategories",{});
    }
    addItem(params):Observable<any> {
        return this._http.post(this.base.getBaseUrl()+'/auth/addItem',params);
    }

    deleteItem(params):Observable<any> {
        return this._http.post(this.base.getBaseUrl()+'/auth/deleteItem',params);
    }
}