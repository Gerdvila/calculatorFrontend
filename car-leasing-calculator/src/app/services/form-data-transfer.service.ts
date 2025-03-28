import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, combineLatest, switchMap, tap, throwError } from 'rxjs';
import { CalculatorFormFields, CarLeasingFormFields, FormsPostRequest, PersonalInformationFormFields } from '../types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class FormDataTransferService {
  private client = inject(HttpClient);

  private calculatorData$ = new BehaviorSubject<CalculatorFormFields>({
    carValue: 0,
    period: "",
    downPayment: 0,
    residualValuePercentage: "",
    isEcoFriendly: false,
    monthlyPayment: ""
  });

  private carLeaseData$ = new BehaviorSubject<CarLeasingFormFields>({
    make: "",
    model: "",
    modelVariant: "",
    fuelType: "",
    enginePower: 0,
    engineSize: 0,
    year: "",
    url: "",
    offer: undefined,
    terms: false,
    confirmation: false
  });

  private personalInformationData$ = new BehaviorSubject<PersonalInformationFormFields>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    pid: "",
    dateOfBirth: 0,
    maritalStatus: "",
    numberOfChildren: 0,
    citizenship: "",
    monthlyIncome: 0,
    languagePref: ""
  })

  setCalculatorData(formData: CalculatorFormFields) {
    this.calculatorData$.next(formData);
  }

  setCarLeaseData(formData: CarLeasingFormFields) {
    this.carLeaseData$.next(formData);
  }

  setPersonalInformationData(formData: PersonalInformationFormFields) {
    this.personalInformationData$.next(formData);
  }

  postAllFormData(): Observable<any> {
    return combineLatest({
      leaseRatesRequest: this.calculatorData$,
      personalInformationRequest: this.personalInformationData$,
      leaseRequest: this.carLeaseData$
    }).pipe(
      switchMap(req => this.client.post<FormsPostRequest>(`${environment.API_URL}/public/applications/create`, req)),
      catchError((error) => throwError(() => error))
    );
  }
}
