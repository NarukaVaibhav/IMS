import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskConfigComponent } from './edit-task-config.component';

describe('EditTaskConfigComponent', () => {
  let component: EditTaskConfigComponent;
  let fixture: ComponentFixture<EditTaskConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
