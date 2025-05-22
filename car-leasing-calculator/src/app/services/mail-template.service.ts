import {inject, Injectable} from '@angular/core';
import {GeneralFormsResponse, MailTemplateResponse, MailTemplateType} from "../types";
import {environment} from "../../environment/environment";
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MailTemplateService {
  private client = inject(HttpClient);

  constructor() {}

  getMailTemplate(applicationId: string | undefined, mailTemplateType: MailTemplateType): Observable<string> {
    if (!applicationId) {
      return throwError(() => new Error('Application ID is required'));
    }
    const url = `${environment.API_URL}/admin/mail/${applicationId}/template/`;
    return this.client.get<MailTemplateResponse>(url, {
      params: { mailTemplateType },
    }).pipe(
        map(response => response.mailContent),
        catchError((error) => {
          console.error('Error fetching mail template:', error);
          return throwError(() => error);
        })
    );
  }
}