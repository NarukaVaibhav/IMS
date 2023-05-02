import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMgmtCoursesComponent } from './course-mgmt-courses.component';

describe('CourseMgmtCoursesComponent', () => {
  let component: CourseMgmtCoursesComponent;
  let fixture: ComponentFixture<CourseMgmtCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMgmtCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMgmtCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
