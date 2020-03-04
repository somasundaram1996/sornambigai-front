import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../toaster.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _router:Router,private _toaster:ToasterService) { }
  logOut(){
      sessionStorage.removeItem("jwtToken");
      this._router.navigateByUrl("login");
  }
  ngOnInit() {
   }
  addJewell(){
    this._router.navigate(["addJewell"],{});
  }

  calculateBill(){
    this._router.navigateByUrl("calculateBill");
  }
}
