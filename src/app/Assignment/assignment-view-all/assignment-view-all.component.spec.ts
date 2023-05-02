import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentViewAllComponent } from './assignment-view-all.component';

describe('AssignmentViewAllComponent', () => {
  let component: AssignmentViewAllComponent;
  let fixture: ComponentFixture<AssignmentViewAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentViewAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
