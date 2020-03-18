import { TestBed } from '@angular/core/testing';

import { PriceChangeService } from './price-change.service';

describe('PriceChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceChangeService = TestBed.get(PriceChangeService);
    expect(service).toBeTruthy();
  });
});
