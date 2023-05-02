import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAttendanceComponent } from './payroll-attendance.component';

describe('PayrollAttendanceComponent', () => {
  let component: PayrollAttendanceComponent;
  let fixture: ComponentFixture<PayrollAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
