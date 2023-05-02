import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementdriveComponent } from './placementdrive.component';

describe('PlacementdriveComponent', () => {
  let component: PlacementdriveComponent;
  let fixture: ComponentFixture<PlacementdriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementdriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementdriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
