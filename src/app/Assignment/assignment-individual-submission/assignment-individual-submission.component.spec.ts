import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentIndividualSubmissionComponent } from './assignment-individual-submission.component';

describe('AssignmentIndividualSubmissionComponent', () => {
  let component: AssignmentIndividualSubmissionComponent;
  let fixture: ComponentFixture<AssignmentIndividualSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentIndividualSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentIndividualSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
