import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoteRequest, MailsAndNotesResponse } from '../types';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private client = inject(HttpClient);

  getMailsAndNotesById(id: string): Observable<MailsAndNotesResponse> {
    return this.client.get<MailsAndNotesResponse>(`${environment.API_URL}/admin/history/note-mail-list/${id}`)
  }

  saveNote(noteRequest: NoteRequest): Observable<any> {
    console.log(noteRequest)
    return this.client.post<NoteRequest>(`${environment.API_URL}/admin/notes/create`, noteRequest)
      .pipe(
        catchError((error: any) => throwError(() => error))
      );
  }

  notesUpdated$ = new Subject<void>();

  notifyNotesUpdated(): void {
    this.notesUpdated$.next();
  }
}
