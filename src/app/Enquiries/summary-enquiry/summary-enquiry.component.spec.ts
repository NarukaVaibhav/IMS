import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryEnquiryComponent } from './summary-enquiry.component';

describe('SummaryEnquiryComponent', () => {
  let component: SummaryEnquiryComponent;
  let fixture: ComponentFixture<SummaryEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
