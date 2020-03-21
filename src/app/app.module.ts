import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ToasterService } from './toaster.service';
import { HomeComponent } from './home/home.component';
import { AddJewellComponent } from './add-jewell/add-jewell.component';
import { CalculateBillComponent } from './calculate-bill/calculate-bill.component';
import { LoginService } from './login/login.service';
import { CommonHttpInteceptorService } from './common-http-inteceptor.service';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from './common-component/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule, MatExpansionModule, MatTooltipModule, MatProgressSpinnerModule, MatTableModule, MatCheckboxModule } from '@angular/material';
import { PriceChangeComponent } from './price-change/price-change.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'home',component:HomeComponent,children:[
    {path:"addJewell",component:AddJewellComponent},
    {path:"calculateBill",component:CalculateBillComponent},
    {path:'updatePrice',component:PriceChangeComponent}
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddJewellComponent,
    CalculateBillComponent,
    ConfirmationDialogComponent,
    PriceChangeComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  entryComponents:[ConfirmationDialogComponent],
  providers: [ToasterService,LoginService, {
    provide:HTTP_INTERCEPTORS, useClass:CommonHttpInteceptorService,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
