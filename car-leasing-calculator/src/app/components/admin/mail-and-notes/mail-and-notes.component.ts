import { Component, OnChanges, SimpleChanges, inject, input } from '@angular/core';
import { MailTabComponent } from '../mail-tab/mail-tab.component';
import { NotesComponent } from '../notes/notes.component';
import { NotesTabComponent } from '../notes-tab/notes-tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { ApplicationListService } from '../../../services/application-list.service';
import { GeneralFormsResponse } from '../../../types';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-mail-and-notes',
  standalone: true,
  imports: [MailTabComponent, NotesTabComponent, NotesComponent, MatTabsModule, MatCardContent, MatCard, MatDivider, AsyncPipe],
  templateUrl: './mail-and-notes.component.html',
  styleUrl: './mail-and-notes.component.scss'
})
export class MailAndNotesComponent implements OnChanges {
  selectedId = input<string>();
  private service = inject(ApplicationListService);

  responseObject: GeneralFormsResponse | undefined;
  responseObject$: Observable<GeneralFormsResponse> | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    const id = this.selectedId()?.toString();
    this.responseObject$ = this.service.getPersonalAndLeaseData(id!);
  }
}
