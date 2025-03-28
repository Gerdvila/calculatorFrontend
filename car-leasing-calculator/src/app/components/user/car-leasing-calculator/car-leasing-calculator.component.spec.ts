import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarLeasingCalculatorComponent } from './car-leasing-calculator.component';

describe('CarLeasingCalculatorComponent', () => {
  let component: CarLeasingCalculatorComponent;
  let fixture: ComponentFixture<CarLeasingCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarLeasingCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarLeasingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
