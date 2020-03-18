import { ConfirmationDialogComponent } from './../common-component/confirmation-dialog/confirmation-dialog.component';
import { PriceChangeService } from './price-change.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin} from 'rxjs';
import { ToasterService } from '../toaster.service';
import { MatDialog } from '@angular/material';
export class ItemModel {
  itemId:number;
  itemName:string;
}

@Component({
  selector: 'app-price-change',
  templateUrl: './price-change.component.html',
  styleUrls: ['./price-change.component.css'],
  providers: [PriceChangeService]
})
export class PriceChangeComponent implements OnInit{
  itemCategoryArray:string[];
  itemCategoryTable:any[];  
  itemCategory:string;
  itemPrice: number;
  
  constructor(private _service:PriceChangeService,private toasterService: ToasterService,
    public dialog: MatDialog) { 
  }


  updatePrice(event) {
    if(!this.itemCategory || !this.getDisplayName(this.itemCategory) || !this.itemPrice) {
      this.toasterService.error('Error','Please check the contents');
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
        width:'300px',
        data:{
          content:'Update Price of ' 
          + this.getDisplayName(this.itemCategory) 
          + ' to ' + this.itemPrice + '?'
      }
      });
      dialogRef.afterClosed().subscribe(confirmation => {
        if(confirmation) {
          const param ={'itemCategoryId': this.itemCategory,'pricePerGram': this.itemPrice};
          this._service.updatePrice(param).subscribe(result => {
            if(result) {
              this.toasterService.success('Info','Price Updated Successfully');
              this.itemPrice = null;
            } else {
              this.toasterService.error('Error','Price not Updated. Please try again.')
            }
          });
        }
      });
    }
  }

  resetPrice() {
    this.itemPrice =null;
  }

  getDisplayName(itemCategoryId): string {
    if(!this.itemCategoryTable || !itemCategoryId) {
      return ""
    } 
    return this.itemCategoryTable.find(item => item.itemCategoryId === itemCategoryId).itemCategoryName;
  }

  ngOnInit() {
    forkJoin(this._service.getItemCategories()).subscribe(res=>{
      this.itemCategoryTable=res[0];
      this.itemCategoryArray=this.itemCategoryTable.map(itemCategory=>itemCategory.itemCategoryName);
      this.itemCategoryArray=Array.from(new Set(this.itemCategoryArray));
      this.itemCategory=this.itemCategoryTable[0].itemCategoryId;
    });
  }
}
