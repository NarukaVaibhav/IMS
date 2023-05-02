import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMgmtTopicComponent } from './course-mgmt-topic.component';

describe('CourseMgmtTopicComponent', () => {
  let component: CourseMgmtTopicComponent;
  let fixture: ComponentFixture<CourseMgmtTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMgmtTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMgmtTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
