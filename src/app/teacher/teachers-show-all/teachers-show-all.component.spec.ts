import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersShowAllComponent } from './teachers-show-all.component';

describe('TeachersShowAllComponent', () => {
  let component: TeachersShowAllComponent;
  let fixture: ComponentFixture<TeachersShowAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersShowAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
