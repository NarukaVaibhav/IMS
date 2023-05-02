import { TestBed, async, inject } from '@angular/core/testing';

import { ActivateHomeGuard } from './activate-home.guard';

describe('ActivateHomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivateHomeGuard]
    });
  });

  it('should ...', inject([ActivateHomeGuard], (guard: ActivateHomeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
