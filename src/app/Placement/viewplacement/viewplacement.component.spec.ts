import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewplacementComponent } from './viewplacement.component';

describe('ViewplacementComponent', () => {
  let component: ViewplacementComponent;
  let fixture: ComponentFixture<ViewplacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewplacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
