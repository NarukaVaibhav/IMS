import { TestBed } from '@angular/core/testing';

import { PDFGENERATEService } from './pdfgenerate.service';

describe('PDFGENERATEService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PDFGENERATEService = TestBed.get(PDFGENERATEService);
    expect(service).toBeTruthy();
  });
});
