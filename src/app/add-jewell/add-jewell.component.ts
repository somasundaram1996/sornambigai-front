import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AddJewellService } from './add-jewell.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { ToasterService } from '../toaster.service';
import { FormControl } from '@angular/forms';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material';
export class ItemModel {
  itemId:number;
  itemName:string;
}
@Component({
  selector: 'app-add-jewell',
  templateUrl: './add-jewell.component.html',
  styleUrls: ['./add-jewell.component.css'],
  providers:[AddJewellService]
})
export class AddJewellComponent implements OnInit {

  itemCategoryArray:string[];
  itemCategoryTable:any[];
  isValid:boolean = true;
  items:any[] =[{'itemId': 0,'itemName':'No Data found'}];
  itemCategory:string;
  itemName: string;
  itemToBeDelted:string;
  exitingItemTab:boolean= false;
  disabled:boolean = false;
  itemId:number;
  itemControl = new FormControl();
  filteredItems: Observable<ItemModel[]>;
  
  subscription: Subscription;
  @ViewChild('newItemTab') newItemTabRef: ElementRef<any>;
  @ViewChild('existingItemTab') existingItemTabRef: ElementRef<any>;
  constructor(private _service:AddJewellService,private toasterService: ToasterService) { 
    this.filteredItems = this.itemControl.valueChanges
    .pipe(debounceTime(500),distinctUntilChanged(),
      startWith(''),
      map(state => state ?  this._filterItem(state) : this.items.slice())
    );
  }

  private _filterItem(value: string): ItemModel[]  {
    let filterValue = ''
    if(value && typeof(value) === 'string'){
      filterValue = value.toLowerCase();
    } else if(typeof(value)==='number'){
      this.isValid = true;
    }
    
    if(typeof(value)==='string') {
      return this.loadDisplayItems(filterValue);
    } else {
      return [];
    }
    
  }

  clearIfInvalid() {
    if(!this.isValid) {
      this.itemControl.setValue('');
    }
  }

  loadGoldCategory(){

  }
  changeActiveTab(tabName){
    if(tabName ==='newTab') {
      this.newItemTabRef.nativeElement.classList.add('active');
      this.existingItemTabRef.nativeElement.classList.remove('active');
      this.exitingItemTab = false;
    } else {
      this.newItemTabRef.nativeElement.classList.remove('active');
      this.existingItemTabRef.nativeElement.classList.add('active');
      this.exitingItemTab = true;
      this.itemCategory=this.itemCategoryTable[0].itemCategoryId;
      this.loadDisplayItems('');
    }

  }

  addItem(event) {
    if(!this.itemCategory || !this.itemName) {
      this.toasterService.error('Error','Please Check the contents');
    } else if(this.itemName.length< 4){
      this.toasterService.error('Error','Please Input Item Name with More than 4 letter');
      
    } else {
      const params = {'itemCategoryId':this.itemCategory,'itemName':this.itemName}
      this._service.addItem(params).subscribe(result =>{
        if(result){
          this.toasterService.info('Info','Item Added Successfully');
          this.itemName="";
        }
      });
    }
  }

  deleteItem(itemName) {
    alert(this.itemControl.value);
  }
  loadDisplayItems(keyword): ItemModel[]{
    const param ={'itemCategoryId':this.itemCategory,'keyword':keyword}
      this._service.loadItems(param).subscribe(items =>{
        if(items.length > 0){
          this.items = items;
          this.isValid = this.items.filter(item => item.itemName === keyword).length > 0;
        } else {
          this.items = [{'itemId': 0,'itemName':'No Data found'}];
          this.isValid = false;
        }
        this.itemControl.markAsTouched();
        if(keyword){
          this.itemControl.patchValue(keyword);
        } else {
          this.itemControl.patchValue('');
        }
      });
      return this.items;
  }

  getDisplayName(itemId) {
    if(!itemId) {
      return "";
    }
    return this.items.find(item => item.itemId === itemId).itemName;
  }

  ngOnInit() {
    forkJoin(this._service.getItemCategories()).subscribe(res=>{
      this.itemCategoryTable=res[0];
      this.itemCategoryArray=this.itemCategoryTable.map(itemCategory=>itemCategory.itemCategoryName);
      this.itemCategoryArray=Array.from(new Set(this.itemCategoryArray));
      this.itemCategory=this.itemCategoryTable[0].itemCategoryId;
      this.newItemTabRef.nativeElement.classList.add('active');
    });
  }

}
