import { TestBed } from '@angular/core/testing';

import { FeeReceiptService } from './fee-receipt.service';

describe('FeeReceiptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeeReceiptService = TestBed.get(FeeReceiptService);
    expect(service).toBeTruthy();
  });
});
