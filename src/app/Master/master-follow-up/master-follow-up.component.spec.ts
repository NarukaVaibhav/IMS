import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFollowUpComponent } from './master-follow-up.component';

describe('MasterFollowUpComponent', () => {
  let component: MasterFollowUpComponent;
  let fixture: ComponentFixture<MasterFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
