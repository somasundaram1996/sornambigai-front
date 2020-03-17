import { ConfirmationDialogComponent } from './../common-component/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../toaster.service';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  shouldRun = true;

  fillerNav = [
    {navName:'Add & Delete Jewell',navLink:'addJewell'}
  ]

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private toaster: ToasterService,private router: Router, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  navigateToPage(linkToPage) {
    if(linkToPage.currentTarget.pathname  === '/logout') {
      sessionStorage.removeItem('jwtToken');
      this.router.navigateByUrl('/login');
      this.toaster.info('Info','Logged Out!');
    } 
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width:'250px',
      data:{content:'Confirm Logout?'}
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result === 'Yes') {
        sessionStorage.removeItem("jwtToken");
        this.toaster.success('Info','Logged Out Successfully');
        this.router.navigateByUrl('/login');
      }
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
