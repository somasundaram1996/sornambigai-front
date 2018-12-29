import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import { ToasterService } from '../toaster.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers :[LoginService]
})

export class LoginComponent implements OnInit {
  userName:string;
  passWord:string;
  Password_p:string="Password";
  Username_p:string="User Name";
  constructor(private _service: LoginService, private toaster: ToasterService,private _router:Router) {

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
  
  }
  onClickSubmit(event){ 
    const params ={"email-id":this.userName,"password":this.passWord};
    if(this.userName==undefined){
      this.toaster.error("Please Check your User Name or Password");
    } else {
    this._service.getUsers(params).subscribe(result=>{
      if(result!=null){
        this._router.navigateByUrl("home");
      } else {
        this.toaster.error("Please Check your User Name or Password");
      }
    });  
  }
  }  

  
}
