import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormSubmissionConfirmationComponent } from '../components/user/form-submission-confirmation/form-submission-confirmation.component';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FormSubmissionConfirmationService {


  constructor(private dialog: MatDialog, private router: Router) { }

  openConfirmationDialog(): MatDialogRef<FormSubmissionConfirmationComponent> {
    return this.dialog.open(FormSubmissionConfirmationComponent, {
      width: '400px',
    });
  }
}
