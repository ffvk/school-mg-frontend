import { TestBed } from '@angular/core/testing';

import { TokensApiService } from './tokens-api.service';

describe('TokensApiService', () => {
  let service: TokensApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokensApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
