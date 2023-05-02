import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentRecordComponent } from './assignment-record.component';

describe('AssignmentRecordComponent', () => {
  let component: AssignmentRecordComponent;
  let fixture: ComponentFixture<AssignmentRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
