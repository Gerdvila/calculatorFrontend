import { Component, OnInit, input, inject, SimpleChanges } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AsyncPipe, DatePipe } from "@angular/common";
import { FormatTextPipe } from "./format-text.pipe";
import { MailsAndNotesResponse } from "../../../types";
import { NotesService } from "../../../services/notes.service";
import { Observable, of } from "rxjs";
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from "@angular/material/expansion";

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [AsyncPipe, CdkAccordionModule, DatePipe, FormatTextPipe, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})

export class NotesComponent implements OnInit {
  applicationId = input<string>();
  private notesService = inject(NotesService);
  responseData$: Observable<MailsAndNotesResponse> = of();

  loadNotesandMails(): void {
    const applicationIdValue = this.applicationId();
    if (applicationIdValue) {
      this.responseData$ = this.notesService.getMailsAndNotesById(applicationIdValue);
    }
  }
  ngOnInit(): void {
    this.notesService.notesUpdated$.subscribe(() => {
      this.loadNotesandMails();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.responseData$ = this.notesService.getMailsAndNotesById(changes['applicationId'].currentValue);
  }
}
