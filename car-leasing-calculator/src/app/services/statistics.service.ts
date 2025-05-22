import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AcceptedApplicationLoanValueResponse, ApplicationDailyCountResponse, ApplicationMonthlyCountResponse, ApplicationStatusCountResponse, HighRiskMonthlyCountResponse } from '../types';
import { environment } from '../../environment/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private client = inject(HttpClient);

  getAllApplicationStatusCount(): Observable<ApplicationStatusCountResponse> {
    return this.client.get<ApplicationStatusCountResponse>(`${environment.API_URL}/admin/statistics/applications/status/count`)
      .pipe(
        catchError((error) => throwError(() => error)));
  }

  getApplicationCountCurrentMonth(): Observable<ApplicationDailyCountResponse[]> {
    return this.client.get<ApplicationDailyCountResponse[]>(`${environment.API_URL}/admin/statistics/applications/daily/count`)
      .pipe(
        catchError((error) => throwError(() => error)));
  }

  getYearlyAcceptedApplicationLoanValue(): Observable<AcceptedApplicationLoanValueResponse> {
    return this.client.get<AcceptedApplicationLoanValueResponse>(`${environment.API_URL}/admin/statistics/applications/accepted/total/sum`)
      .pipe(
        catchError((error) => throwError(() => error)));
  }

  getNewCustomerCount(): Observable<ApplicationMonthlyCountResponse> {
    return this.client.get<ApplicationMonthlyCountResponse>(`${environment.API_URL}/admin/statistics/applications/monthly/count`)
      .pipe(
        catchError((error) => throwError(() => error)));
  }

  getHighRiskApplicationCount(): Observable<HighRiskMonthlyCountResponse> {
    return this.client.get<HighRiskMonthlyCountResponse>(`${environment.API_URL}/admin/statistics/applications/high-risk/count`)
      .pipe(
        catchError((error) => throwError(() => error)));
  }
}
