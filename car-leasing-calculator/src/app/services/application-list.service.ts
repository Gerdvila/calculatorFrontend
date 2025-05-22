import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Application, GeneralFormsResponse, sortAndFilterRequest } from '../types';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})

export class ApplicationListService {
  private client = inject(HttpClient);

  getApplicationsByStatusAndQuery(inputs: sortAndFilterRequest): Observable<Application[]> {
    return this.client
      .post<Application[]>(`${environment.API_URL}/admin/applications`, inputs)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  getPersonalAndLeaseData(id: string): Observable<GeneralFormsResponse> {
    return this.client.get<GeneralFormsResponse>(
      `${environment.API_URL}/admin/applications/${id}`
    )
      .pipe(
        catchError((error) => {
          console.error('Error fetching personal and lease data:', error);
          return throwError(() => error);
        })
      );
  }

  updateIsOpened(id: string): Observable<any> {
    return this.client.patch(`${environment.API_URL}/admin/status/update/is-read?id=${id}`, {})
      .pipe(
        catchError((error) => throwError(() => error)))
  }
}
