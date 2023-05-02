import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMgmtChapterComponent } from './course-mgmt-chapter.component';

describe('CourseMgmtChapterComponent', () => {
  let component: CourseMgmtChapterComponent;
  let fixture: ComponentFixture<CourseMgmtChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMgmtChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMgmtChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
