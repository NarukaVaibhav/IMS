import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeFeedbackComponent } from './add-employee-feedback.component';

describe('AddEmployeeFeedbackComponent', () => {
  let component: AddEmployeeFeedbackComponent;
  let fixture: ComponentFixture<AddEmployeeFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeeFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
