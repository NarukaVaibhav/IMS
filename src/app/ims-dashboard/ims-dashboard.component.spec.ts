import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsDashboardComponent } from './ims-dashboard.component';

describe('ImsDashboardComponent', () => {
  let component: ImsDashboardComponent;
  let fixture: ComponentFixture<ImsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
