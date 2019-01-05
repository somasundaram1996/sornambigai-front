import { Component, OnInit, Inject, HostListener, OnDestroy } from '@angular/core';
import {LoginService} from './login.service';
import { ToasterService } from '../toaster.service';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers :[LoginService]
})

export class LoginComponent implements OnInit{
  userName:string;
  passWord:string;
  isLoading:boolean=false;
  Password_p:string="Password";
  Username_p:string="User Name";    
  constructor(private _service: LoginService, private _toaster: ToasterService,private _router:Router) {

   }

  changeOutUFocus(){
    this.Username_p="User Name";
  }
  changeOutPFocus(){
    this.Password_p="Password";
  }
  changeInUFocus(){
    this.Username_p="";
  }
  changeInPFocus(){
    this.Password_p="";
  }

  ngOnInit() {
    if(localStorage.getItem("isLoggedIn")=="true"){
      this._router.navigateByUrl("home");
    }
  }
  onClickSubmit(event){ 
    const params ={"email-id":this.userName,"password":this.passWord};
    this.isLoading=true;
    if(this.userName==undefined){
      this._toaster.error("Error","Please Check your User Name or Password");
      this.isLoading=false;
    } else {
    this._service.getUsers(params).subscribe(result=>{
      this.isLoading=false;
      if(result){
        localStorage.setItem("isLoggedIn","true");
        this._router.navigateByUrl("home");
      } else {
        this._toaster.error("Error","Please Check your User Name or Password");
      }
    });  
  }
  }  
  
}
