import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMgmtSubSubjectsComponent } from './course-mgmt-sub-subjects.component';

describe('CourseMgmtSubSubjectsComponent', () => {
  let component: CourseMgmtSubSubjectsComponent;
  let fixture: ComponentFixture<CourseMgmtSubSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMgmtSubSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMgmtSubSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
