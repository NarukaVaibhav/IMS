import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualAttendenceShowComponent } from './individual-attendence-show.component';

describe('IndividualAttendenceShowComponent', () => {
  let component: IndividualAttendenceShowComponent;
  let fixture: ComponentFixture<IndividualAttendenceShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualAttendenceShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualAttendenceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
