import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http'
import { ToasterService } from './toaster.service';
import { HomeComponent } from './home/home.component';
import { AddJewellComponent } from './add-jewell/add-jewell.component';
import { CalculateBillComponent } from './calculate-bill/calculate-bill.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'home',component:HomeComponent,children:[
    {path:"addJewell",component:AddJewellComponent},
    {path:"calculateBill",component:CalculateBillComponent}
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddJewellComponent,
    CalculateBillComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
