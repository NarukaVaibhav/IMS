import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMgmtSubCoursesComponent } from './course-mgmt-sub-courses.component';

describe('CourseMgmtSubCoursesComponent', () => {
  let component: CourseMgmtSubCoursesComponent;
  let fixture: ComponentFixture<CourseMgmtSubCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMgmtSubCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMgmtSubCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
