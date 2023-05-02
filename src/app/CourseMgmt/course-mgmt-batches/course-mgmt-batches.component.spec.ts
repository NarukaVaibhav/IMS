import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMgmtBatchesComponent } from './course-mgmt-batches.component';

describe('CourseMgmtBatchesComponent', () => {
  let component: CourseMgmtBatchesComponent;
  let fixture: ComponentFixture<CourseMgmtBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMgmtBatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMgmtBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
