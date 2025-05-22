import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NoteRequest } from '../../../types';
import { NotesService } from '../../../services/notes.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-notes-tab',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
  ],
  templateUrl: './notes-tab.component.html',
  styleUrl: './notes-tab.component.scss',
})
export class NotesTabComponent {
  private notesService = inject(NotesService);

  noteText: string = '';
  applicationId = input<string>();

  saveNote(): void {
    const noteRequest: NoteRequest = {
      applicationId: this.applicationId()!,
      noteText: this.noteText,
    };

    this.notesService.saveNote(noteRequest).subscribe({
      next: (response) => {
        this.notesService.notifyNotesUpdated();
        this.noteText = '';
      },
      error: (error) => {
        console.error('Error saving note:', error);
      }
    });
  }
}
