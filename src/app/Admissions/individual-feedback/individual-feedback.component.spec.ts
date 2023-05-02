import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualFeedbackComponent } from './individual-feedback.component';

describe('IndividualFeedbackComponent', () => {
  let component: IndividualFeedbackComponent;
  let fixture: ComponentFixture<IndividualFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
