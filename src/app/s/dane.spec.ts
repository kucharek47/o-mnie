import { TestBed } from '@angular/core/testing';

import { Dane } from './dane';

describe('Dane', () => {
  let service: Dane;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dane);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
