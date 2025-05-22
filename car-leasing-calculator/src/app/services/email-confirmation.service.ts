import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmailModalComponent } from '../components/general/email-modal/email-modal.component';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmationService {
  private dialog: MatDialog = inject(MatDialog);

  openConfirmationDialog(): MatDialogRef<EmailModalComponent> {
    return this.dialog.open(EmailModalComponent, {
      width: '400px',
    });
  }
}
