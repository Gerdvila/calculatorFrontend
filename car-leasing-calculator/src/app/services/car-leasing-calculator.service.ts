import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CalculatorRequest, CalculatorResponse } from '../types';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthlyPaymentCalculatorService {
  private client = inject(HttpClient);

  getMonthlyPayment(inputs: Partial<CalculatorRequest>): Observable<any> {
    return this.client.post<CalculatorResponse>(`${environment.API_URL}/public/calculator`, inputs)
      .pipe(
        catchError((error) => throwError(() => error))
      );
  }
}
