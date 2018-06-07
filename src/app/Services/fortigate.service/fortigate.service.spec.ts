import { TestBed, inject } from '@angular/core/testing';

import { FortigateService } from './fortigate.service';

describe('FortigateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FortigateService]
    });
  });

  it('should be created', inject([FortigateService], (service: FortigateService) => {
    expect(service).toBeTruthy();
  }));
});
