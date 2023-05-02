import { TestBed } from '@angular/core/testing';

import { PlacementdataService } from './placementdata.service';

describe('PlacementdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlacementdataService = TestBed.get(PlacementdataService);
    expect(service).toBeTruthy();
  });
});
