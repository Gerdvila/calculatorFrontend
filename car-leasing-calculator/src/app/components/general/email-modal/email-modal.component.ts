import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-emai-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle],
  templateUrl: './email-modal.component.html',
  styleUrl: './email-modal.component.scss'
})
export class EmailModalComponent {
  constructor(public dialogRef: MatDialogRef<EmailModalComponent>) { }
}
