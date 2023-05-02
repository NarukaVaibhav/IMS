import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSkillBharatComponent } from './system-skill-bharat.component';

describe('SystemSkillBharatComponent', () => {
  let component: SystemSkillBharatComponent;
  let fixture: ComponentFixture<SystemSkillBharatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemSkillBharatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSkillBharatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
