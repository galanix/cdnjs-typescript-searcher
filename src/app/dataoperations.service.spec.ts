import { TestBed, inject } from '@angular/core/testing';

import { DataoperationsService } from './dataoperations.service';

describe('DataoperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataoperationsService]
    });
  });

  it('should be created', inject([DataoperationsService], (service: DataoperationsService) => {
    expect(service).toBeTruthy();
  }));
});
