import { TestBed } from '@angular/core/testing';

import { FormSubmissionConfirmationService } from './form-submission-confirmation.service';

describe('FormSubmissionConfirmationService', () => {
  let service: FormSubmissionConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSubmissionConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
