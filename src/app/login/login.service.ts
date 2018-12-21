import {Base} from '../resources/common/base-url'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
    userExist:boolean=false;
    _base:Base = new Base();
    constructor(private _http :HttpClient){}
    checkUserId(values:any):boolean{
         this._http.get(this._base.getBaseUrl()).subscribe(params=>{
           console.log(params[0].id);
        });
        return this.userExist;
    }
}