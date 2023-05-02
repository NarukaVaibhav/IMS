import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptAllComponent } from './receipt-all.component';

describe('ReceiptAllComponent', () => {
  let component: ReceiptAllComponent;
  let fixture: ComponentFixture<ReceiptAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
