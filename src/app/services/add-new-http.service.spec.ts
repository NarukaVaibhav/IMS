import { TestBed } from '@angular/core/testing';

import { AddNewHTTPService } from './add-new-http.service';

describe('AddNewHTTPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddNewHTTPService = TestBed.get(AddNewHTTPService);
    expect(service).toBeTruthy();
  });
});
