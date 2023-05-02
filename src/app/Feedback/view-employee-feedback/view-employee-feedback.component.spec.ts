import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeeFeedbackComponent } from './view-employee-feedback.component';

describe('ViewEmployeeFeedbackComponent', () => {
  let component: ViewEmployeeFeedbackComponent;
  let fixture: ComponentFixture<ViewEmployeeFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmployeeFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployeeFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
