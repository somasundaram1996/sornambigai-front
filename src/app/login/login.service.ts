import {Base} from '../resources/common/base-url'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class LoginService {
    userExist:boolean=false;
    _base:Base = new Base();
    constructor(private _http :HttpClient){}
    getUsers(params):Observable<any>{
        return this._http.post(this._base.getBaseUrl()+"/checkUser",params);
    }
}