import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MonthlyPaymentCalculatorService } from '../../../services/car-leasing-calculator.service';
import { CalculatorRequest, CalculatorResponse } from '../../../types';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Observable, catchError, ignoreElements, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormDataTransferService } from '../../../services/form-data-transfer.service';
import { TranslateModule } from "@ngx-translate/core";
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-car-leasing-calculator',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    AsyncPipe,
    TranslateModule,
    MatTooltip
  ],
  templateUrl: './car-leasing-calculator.component.html',
  styleUrl: './car-leasing-calculator.component.scss'
})
export class CarLeasingCalculatorComponent implements OnInit {
  private service = inject(MonthlyPaymentCalculatorService);
  private transferDataService = inject(FormDataTransferService);
  private router = inject(Router);

  calculatorForm = this.makeForm();
  monthlyPayment$: Observable<CalculatorResponse> | undefined;
  monthlyPaymentError$: Observable<any> | undefined;

  ngOnInit(): void {
    this.calculatorForm.valueChanges.subscribe(x => {
      this.calculateMonthlyPayment();
    })
  }

  private makeForm() {
    return new FormGroup(
      {
        carValue: new FormControl<number | null>(null, [
          Validators.required,
          Validators.min(300),
          Validators.pattern('^[0-9]*$')
        ]),
        period: new FormControl<string | null>(null, [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]),
        downPayment: new FormControl<number | null>(null, [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]*$')
        ]),
        residualValuePercentage: new FormControl<string>('0'),
        isEcoFriendly: new FormControl<boolean>(false)
      });
  }

  onSubmit(): void {
    let monthlyPayment: string = (document.getElementById('monthlyPayment') as HTMLInputElement).value;
    if (!this.calculatorForm.valid || monthlyPayment === "Incorrect data" || monthlyPayment === "") {
      return;
    }

    this.transferDataService.setCalculatorData({
      carValue: this.carValue?.value!,
      period: this.period?.value!,
      downPayment: this.downPayment?.value!,
      residualValuePercentage: this.residualValuePercentage?.value!,
      isEcoFriendly: this.isEcoFriendly?.value!,
      monthlyPayment: monthlyPayment
    });

    this.router.navigate(['registration']);
  }

  calculateMonthlyPayment(): void {
    if (this.calculatorForm.valid) {
      this.monthlyPayment$ = this.service.getMonthlyPayment(this.calculatorForm.value as Partial<CalculatorRequest>);
      this.monthlyPaymentError$ = this.monthlyPayment$.pipe(
        ignoreElements(),
        catchError((error) => of(error)));
    }
    return;
  }

  get carValue() {
    return this.calculatorForm.get('carValue');
  }

  get downPayment() {
    return this.calculatorForm.get('downPayment');
  }

  get period() {
    return this.calculatorForm.get('period');
  }

  get residualValuePercentage() {
    return this.calculatorForm.get('residualValuePercentage');
  }

  get isEcoFriendly() {
    return this.calculatorForm.get('isEcoFriendly');
  }
}
