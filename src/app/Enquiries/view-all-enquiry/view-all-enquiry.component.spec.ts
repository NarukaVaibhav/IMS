import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllEnquiryComponent } from './view-all-enquiry.component';

describe('ViewAllEnquiryComponent', () => {
  let component: ViewAllEnquiryComponent;
  let fixture: ComponentFixture<ViewAllEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
