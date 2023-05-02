import { TestBed } from '@angular/core/testing';

import { ViewUsersService } from './view-users.service';

describe('ViewUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewUsersService = TestBed.get(ViewUsersService);
    expect(service).toBeTruthy();
  });
});
