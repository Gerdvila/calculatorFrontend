import { TestBed } from '@angular/core/testing';

import { LeasingFormService} from './leasing-form-service.service';

describe('LeasingFormServiceService', () => {
  let service: LeasingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeasingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
