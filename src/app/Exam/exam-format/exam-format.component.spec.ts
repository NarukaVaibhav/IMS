import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ExamFormatComponent
} from './exam-format.component';

describe('ExamFormatComponent', () => {
  let component: ExamFormatComponent;
  let fixture: ComponentFixture < ExamFormatComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [ExamFormatComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
