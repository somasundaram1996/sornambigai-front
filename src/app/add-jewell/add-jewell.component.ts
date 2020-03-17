import { ConfirmationDialogComponent } from './../common-component/confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AddJewellService } from './add-jewell.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { ToasterService } from '../toaster.service';
import { FormControl } from '@angular/forms';
import { startWith, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatDialog } from '@angular/material';
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
  items:any[] = [];
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
  constructor(private _service:AddJewellService,private toasterService: ToasterService,
    public dialog: MatDialog) { 
    this.filteredItems = this.itemControl.valueChanges
    .pipe(
      startWith(''),
      map(state => this._filterItem(state))
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
      this.isValid = this.items.filter(item => item.itemName === filterValue).length > 0;
      return this.items.filter(item => item.itemName.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return [];
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
          this.toasterService.success('Info','Item Added Successfully');
          this.itemName="";
        }
      });
    }
  }

  deleteItem(itemId) {
    if(!this.items.find(item => item.itemId === this.itemControl.value)) {
      this.itemControl.patchValue('');
      this.toasterService.error('Error','Enter valid Element');
      return;
    }
    if(this.itemControl.value) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
        width:'250px',
        data:{content: 'Are you sure you want to delete ' + this.getDisplayName(this.itemControl.value) +'?'}
      });
      dialogRef.afterClosed().subscribe(confirmation => {
        if(confirmation === 'Yes'){
        this._service.deleteItem({'itemId':''+ this.itemControl.value}).subscribe(result =>{
          if(result){
            this.toasterService.success('Info','Item Deleted');
            this.loadDisplayItems('');
          } else {
            this.toasterService.error('Error','Item Not Delted!!!');
          }
        });
      }
      });
    } else {
      this.toasterService.error('Error','Please Select an Item');
    }
  }
  loadDisplayItems(keyword){
    const param ={'itemCategoryId':this.itemCategory,'keyword':keyword}
      this._service.loadItems(param).subscribe(items =>{
        if(items.length > 0){
          this.items = items;
        } else {
          this.items =[];
          this.isValid = false;
        }
        this.itemControl.markAsTouched();
        this.itemControl.patchValue('');
      });
  }

  clearIfInvalid(){
    if(!this.items.find(item => item.itemId === this.itemControl.value)) {
      this.itemControl.patchValue('');
    }
  }

  getDisplayName(itemId) {
    if(!itemId) {
      return "";
    }
    if(typeof(itemId)!=='number'){
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
