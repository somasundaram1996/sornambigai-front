import { Injectable } from '@angular/core';
declare var toastr:any;
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() {
    toastr.settings=this.settings();
   }
  success(message:string,title?:string){
    toastr.success(title,message);
  }

  warning(message:string,title?:string){
    toastr.warning(title,message);
  }

  error(message:string,title?:string){
    toastr.error(title,message);
  }
  info(message:string,title?:string){
    toastr.info(title,message);
  }
settings(){
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "3000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}
}
