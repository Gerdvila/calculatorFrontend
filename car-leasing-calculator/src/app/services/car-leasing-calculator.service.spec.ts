import { TestBed } from '@angular/core/testing';

import { MonthlyPaymentCalculatorService } from './car-leasing-calculator.service';

describe('MonthlyPaymentCalculatorService', () => {
  let service: MonthlyPaymentCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyPaymentCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
