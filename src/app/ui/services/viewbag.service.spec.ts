import { TestBed } from '@angular/core/testing';

import { ViewbagService } from './viewbag.service';

describe('ViewbagService', () => {
  let service: ViewbagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewbagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
