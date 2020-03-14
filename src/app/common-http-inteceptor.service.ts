import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, retry} from 'rxjs/operators'
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpInteceptorService implements HttpInterceptor{

  constructor(private _router: Router, private _toaster: ToasterService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(sessionStorage.getItem('jwtToken')) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken')
        }
      })
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
         if (error.error instanceof ErrorEvent) {
           this._toaster.error('Error','Client Error Sorry for the inconvenience');
         } else {
           console.log(req.headers);
           if(!req.headers.has('fromLogin')){
           if(error.status === 401) {
             this._toaster.info('Info','Session Timeout!!!!');
             this._router.navigate(['/login']);
           } else {
            this._toaster.error('Error','Server Error Sorry for the inconvenience');
           }
          } else {
            return throwError(error);
          }
         }
         return throwError(errorMessage);
      })
);
  }
}
