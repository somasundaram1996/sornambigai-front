import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomDataSource } from './grid-datasource/grid-datasource';
export interface Transaction {
  itemId:number;
  item: string;
  gramsPurchased:number;
  costperGram:number;
}
@Component({
  selector: 'app-calculate-bill',
  templateUrl: './calculate-bill.component.html',
  styleUrls: ['./calculate-bill.component.css']
})
export class CalculateBillComponent {
  displayedColumns: string[] = ['select','itemId','item','costPerGram' ,'cost','delete'];
  itemArray: Transaction[] = [
{itemId:1,item:'Item 1',costperGram:5,gramsPurchased:4},
{itemId:2,item:'Item 2',costperGram:8,gramsPurchased:4},
{itemId:3,item:'Item 3',costperGram:8,gramsPurchased:4},
{itemId:4,item:'Item 4',costperGram:8,gramsPurchased:4},
{itemId:5,item:'Item 5',costperGram:8,gramsPurchased:4},
{itemId:6,item:'Item 6',costperGram:8,gramsPurchased:4},
{itemId:7,item:'Item 7',costperGram:8,gramsPurchased:4},
{itemId:8,item:'Item 8',costperGram:8,gramsPurchased:4},
{itemId:9,item:'Item 9',costperGram:8,gramsPurchased:4},
{itemId:10,item:'Item 10',costperGram:8,gramsPurchased:4}
];
dataSourceSubject: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>(this.itemArray);
dataSource = new CustomDataSource(this.dataSourceSubject);
  deletedId = new BehaviorSubject<number[]>([]);
  selection = new SelectionModel<Transaction>(true, []);

  constructor() {
      
    }

    
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    let numRows = 0;
    this.dataSource.returnData().subscribe(result =>{
    numRows = result.length;
      });
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.returnData().subscribe(result =>{
          result.forEach(row =>  this.selection.select(row));
        });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Transaction): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.itemId + 1}`;
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    let total = 0
    this.dataSource.returnData().subscribe(result =>{
      total = result.map(t => t.costperGram * t.gramsPurchased).reduce((acc, value) => acc + value, 0);
    });
    return total;
  }

  ngOnInit(): void {
  }
  emitDeletedId(itemId) {    
    this.itemArray = this.itemArray.filter(item => item.itemId!== itemId);
    this.deletedId.next(itemId);
    this.dataSourceSubject.next(this.itemArray);
  }

}
