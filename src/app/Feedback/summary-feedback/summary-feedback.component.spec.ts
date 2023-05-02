import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryFeedbackComponent } from './summary-feedback.component';

describe('SummaryFeedbackComponent', () => {
  let component: SummaryFeedbackComponent;
  let fixture: ComponentFixture<SummaryFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
