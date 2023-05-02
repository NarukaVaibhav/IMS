import { TestBed } from '@angular/core/testing';

import { EnquiryServiceService } from './enquiry-service.service';

describe('EnquiryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnquiryServiceService = TestBed.get(EnquiryServiceService);
    expect(service).toBeTruthy();
  });
});
