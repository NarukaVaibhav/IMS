import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskConfigComponent } from './view-task-config.component';

describe('ViewTaskConfigComponent', () => {
  let component: ViewTaskConfigComponent;
  let fixture: ComponentFixture<ViewTaskConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
