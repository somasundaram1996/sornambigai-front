import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers :[LoginService]
})

export class LoginComponent implements OnInit {
  userName:string="vijay";
  passWord:string;
  Password_p:string="Password";
  Username_p:string="User Name";
  
  constructor(private _service:LoginService) { }

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
    const param={'userName':this.userName,'password':this.passWord}
    this._service.checkUserId(param);
  }
}
