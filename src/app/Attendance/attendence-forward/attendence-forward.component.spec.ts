import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceForwardComponent } from './attendence-forward.component';

describe('AttendenceForwardComponent', () => {
  let component: AttendenceForwardComponent;
  let fixture: ComponentFixture<AttendenceForwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendenceForwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendenceForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
