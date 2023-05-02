import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceiptMasterComponent } from './add-receipt-master.component.ts';

describe('AddReceiptMasterComponent', () => {
  let component: AddReceiptMasterComponent;
  let fixture: ComponentFixture<AddReceiptMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReceiptMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReceiptMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
