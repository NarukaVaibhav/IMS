import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMgmtQuestionsComponent } from './course-mgmt-questions.component';

describe('CourseMgmtQuestionsComponent', () => {
  let component: CourseMgmtQuestionsComponent;
  let fixture: ComponentFixture<CourseMgmtQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMgmtQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMgmtQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
