import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualSubmissionComponent } from './individual-submission.component';

describe('IndividualSubmissionComponent', () => {
  let component: IndividualSubmissionComponent;
  let fixture: ComponentFixture<IndividualSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
