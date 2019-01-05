import { Component, OnInit } from '@angular/core';
import { AddJewellService } from './add-jewell.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-jewell',
  templateUrl: './add-jewell.component.html',
  styleUrls: ['./add-jewell.component.css'],
  providers:[AddJewellService]
})
export class AddJewellComponent implements OnInit {

  itemCategoryArray:string[];
  itemCategoryTable:any[];
  itemCategory:string;
  isGold:boolean = true;
  goldCategoryType:string;
  goldCategoryArray:string[];
  subTypeTableArray:any[];
  subTypeArray:string[];
  subType:string;
  dealerNameArray:string[];
  dealerTableArray:any[];
  dealerName:string;
  quantity:number=1;
  itemsTableArray:any[];  
  itemsArray:string[];
  isItemsEmpty:boolean=false;
  selectedItem:string;
  constructor(private _service:AddJewellService) { }

  loadGoldCategory(){

  }

  loadDisplayItems(){
    let goldCategoryId:string="";
    let dealerId:string="";
    let itemCategoryId:string="";
    if(this.itemCategory=="Gold"){
      this.isGold=true;
      goldCategoryId=this.itemCategoryTable.filter(item=>item.itemCategoryName==this.itemCategory && item.goldCategoryName==this.goldCategoryType).map(item=>item.goldCategoryId).pop();
    }else{
      this.isGold=false;
      goldCategoryId=this.itemCategoryTable.filter(item=>item.itemCategoryName==this.itemCategory && item.goldCategoryName).map(item=>item.goldCategoryId).pop();
    }
    itemCategoryId=this.itemCategoryTable.filter(item=>item.itemCategoryName==this.itemCategory).map(item=>item.itemCategoryId).pop();
    dealerId=this.dealerTableArray.filter(dealer=>dealer.dealerName==this.dealerName).map(dealer=>dealer.dealerId).pop();
    const param={"itemCategoryId":itemCategoryId,"dealerId":dealerId,"goldCategoryId":goldCategoryId};
    this._service.loadItems(param).subscribe(items=>{
      this.itemsTableArray=items;
      this.itemsArray=items.map(item=>item.itemName);
      this.selectedItem=this.itemsArray[0];
      this.loadSubTypeId();
    });
    if(this.itemsArray.length==0 || this.itemCategory=="Silver"){
      this.isItemsEmpty=true;
    } else {
      this.isItemsEmpty=false;
    }
  }

  ngOnInit() {
    let goldCategoryId:string="";
    let dealerId:string="";
    let itemCategoryId:string="";
    forkJoin(this._service.getItemCategories(),this._service.getSubtypeDetails(),this._service.getDealerDetails()).subscribe(res=>{
      this.itemCategoryTable=res[0];
      this.subTypeTableArray=res[1];
      this.dealerTableArray=res[2];
      this.itemCategoryArray=this.itemCategoryTable.map(itemCategory=>itemCategory.itemCategoryName);
      this.itemCategoryArray=Array.from(new Set(this.itemCategoryArray));
      this.goldCategoryArray=this.itemCategoryTable.map(goldCategory=>goldCategory.goldCategoryName).filter(goldCategory=>goldCategory!="Silver");
      this.dealerNameArray=this.dealerTableArray.map(dealer=>dealer.dealerName);
      this.goldCategoryType=this.goldCategoryArray[0];
      this.dealerName=this.dealerNameArray[0];
      this.itemCategory=this.itemCategoryArray[0];
      itemCategoryId=this.itemCategoryTable.filter(item=>item.itemCategoryName==this.itemCategory).map(item=>item.itemCategoryId).pop();
      dealerId=this.dealerTableArray.filter(dealer=>dealer.dealerName==this.dealerName).map(dealer=>dealer.dealerId).pop();
      goldCategoryId=this.itemCategoryTable.filter(item=>item.itemCategoryName==this.itemCategory && item.goldCategoryName==this.goldCategoryType).map(item=>item.goldCategoryId).pop();
    const param = {"itemCategoryId":itemCategoryId,"dealerId":dealerId,"goldCategoryId":goldCategoryId};
    this._service.loadItems(param).subscribe(items=>{
      this.itemsTableArray=items;      
      this.itemsArray=items.map(item=>item.itemName);
      this.selectedItem=this.itemsArray[0];
      this.loadSubTypeId();

    });
    });
  }
  
    public loadSubTypeId(){
      let subTypeIdfromItems = this.itemsTableArray.map(item=>item.itemsubtypeId);
      this.subTypeArray = this.subTypeTableArray.filter(items=>
        subTypeIdfromItems.indexOf(items.itemSubtypeId)!=-1).map(item=>item.itemSubtypeName);
    }


}
