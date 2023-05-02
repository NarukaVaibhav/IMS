import { TestBed } from '@angular/core/testing';

import { RoleDATAService } from './role-data.service';

describe('RoleDATAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleDATAService = TestBed.get(RoleDATAService);
    expect(service).toBeTruthy();
  });
});
