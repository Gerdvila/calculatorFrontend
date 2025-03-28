import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarLeasingFormComponent } from './car-leasing-form.component';

describe('CarLeasingFormComponent', () => {
  let component: CarLeasingFormComponent;
  let fixture: ComponentFixture<CarLeasingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarLeasingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarLeasingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
