import { TestBed } from '@angular/core/testing';

import { FormDataTransferService } from './form-data-transfer.service';

describe('FormDataTransferService', () => {
  let service: FormDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
