import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSHOWComponent } from './dialog-show.component';

describe('DialogSHOWComponent', () => {
  let component: DialogSHOWComponent;
  let fixture: ComponentFixture<DialogSHOWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSHOWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSHOWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
