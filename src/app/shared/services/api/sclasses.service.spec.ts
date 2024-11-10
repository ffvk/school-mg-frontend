import { TestBed } from '@angular/core/testing';

import { SclassesService } from './sclasses.service';

describe('SclassesService', () => {
  let service: SclassesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SclassesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
