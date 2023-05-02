import { TestBed } from '@angular/core/testing';

import { AttendanceSheetService } from './attendance-sheet.service';

describe('AttendanceSheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendanceSheetService = TestBed.get(AttendanceSheetService);
    expect(service).toBeTruthy();
  });
});
