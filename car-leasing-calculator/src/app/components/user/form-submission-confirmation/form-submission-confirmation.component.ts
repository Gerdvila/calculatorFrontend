import { Component } from '@angular/core';
import { MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from "@ngx-translate/core";


@Component({
  selector: 'app-form-submission-confirmation',
  standalone: true,
  imports: [MatButtonModule, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogTitle, TranslateModule],
  templateUrl: './form-submission-confirmation.component.html',
  styleUrl: './form-submission-confirmation.component.scss'
})
export class FormSubmissionConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<FormSubmissionConfirmationComponent>) { }
}
