import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementeditComponent } from './placementedit.component';

describe('PlacementeditComponent', () => {
  let component: PlacementeditComponent;
  let fixture: ComponentFixture<PlacementeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
