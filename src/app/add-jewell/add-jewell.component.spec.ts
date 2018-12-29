import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJewellComponent } from './add-jewell.component';

describe('AddJewellComponent', () => {
  let component: AddJewellComponent;
  let fixture: ComponentFixture<AddJewellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJewellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJewellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
