import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetLoginsComponent } from './reset-logins.component';

describe('ResetLoginsComponent', () => {
  let component: ResetLoginsComponent;
  let fixture: ComponentFixture<ResetLoginsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetLoginsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetLoginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
