import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import { ToasterService } from '../toaster.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers :[LoginService]
})

export class LoginComponent implements OnInit{
  userName:string;
  emailId:string;
  passWord:string;
  isLoading:boolean=false;
  signingUp:boolean=false;
  emailId_p: string= "Email Id";
  Password_p:string="Password";
  Username_p:string="User Name";    
  constructor(private _service: LoginService, private _toaster: ToasterService,private _router:Router) {

   }
   changeView() {
     this.signingUp = true;
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

  changeInEFocus(){
    this.emailId_p="";
  }
  changeOutEFocus(){
    this.emailId_p="Email Id";
  }

  addUser() {
    this.isLoading=true;
    if(this.emailId==undefined || this.userName==undefined || this.passWord==undefined){
      this._toaster.error("Error","Please Enter Valid Details");
      this.isLoading=false;
    } else {
      const params ={"emailId":this.emailId,"password":this.passWord,'userName':this.userName};
      this._service.addUser(params).subscribe(result =>{
        if(result){
          this._toaster.info("Info","User added Successfully");
        } else {
          this._toaster.error('Error',"User already Existing Choose Another Email");
          this.passWord="";
          this.userName="";
          this.emailId="";
        }
        this.signingUp = false;
      this.isLoading=false;
      });
    }
  }

  ngOnInit() {
  }
  onClickSubmit(event){ 
    const params ={"userName":btoa(this.emailId),"password":btoa(this.passWord)};
    this.isLoading=true;
    if(this.emailId==undefined){
      this._toaster.error("Error","Please Check your User Name or Password");
      this.isLoading=false;
    } else {
    this._service.getUsers(params).pipe(catchError(error =>{
      if(error.status === 401){
        this._toaster.error("Error","Bad Credentials!... Please try later");
        this.signingUp = false;
      this.isLoading=false;  
      } else{
        this._toaster.error("Error","Server Error!... Please try later");
        this.signingUp = false;
        this.isLoading=false;
        this.passWord="";
        this.userName="";
        this.emailId="";
      }
      return null;
    })).subscribe(result=>{
      this.isLoading=false;
      sessionStorage.setItem('jwtToken',result['jwt']);
      this._router.navigateByUrl("home");
    });
  }
  }  
  
}
