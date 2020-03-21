import { DataSource } from '@angular/cdk/table';
import { Transaction } from '../calculate-bill.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';

export class CustomDataSource extends DataSource<Transaction> {
    constructor(private myArray: BehaviorSubject<Transaction[]>){
      super();
    }
    connect(collection: CollectionViewer): Observable<Transaction[]> {
      return this.myArray.asObservable();
    }
    returnData() {
      return this.myArray.asObservable();
    }
    disconnect(collection: CollectionViewer): void {
    }
  }