import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystenTenantConfigComponent } from './systen-tenant-config.component';

describe('SystenTenantConfigComponent', () => {
  let component: SystenTenantConfigComponent;
  let fixture: ComponentFixture<SystenTenantConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystenTenantConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystenTenantConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
