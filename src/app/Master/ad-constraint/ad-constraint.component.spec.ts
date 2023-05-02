import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdConstraintComponent } from './ad-constraint.component';

describe('AdConstraintComponent', () => {
  let component: AdConstraintComponent;
  let fixture: ComponentFixture<AdConstraintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdConstraintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdConstraintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
