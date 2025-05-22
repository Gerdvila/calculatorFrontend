import {Component, inject, input, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/autocomplete';
import {MatSelect} from '@angular/material/select';
import {MailService} from '../../../services/mail.service';
import {GeneralFormsResponse, MailRequest, MailTemplateType, Status} from '../../../types';
import {MailTemplateService} from "../../../services/mail-template.service";
import {MatInputModule} from '@angular/material/input';
import {EmailConfirmationService} from '../../../services/email-confirmation.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-mail-tab',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
  ],
  templateUrl: './mail-tab.component.html',
  styleUrl: './mail-tab.component.scss',
})

export class MailTabComponent implements OnInit {
  dataForEmailTab = input<GeneralFormsResponse>();
  applicationId = input<string>();
  status!: Status;
  isEditing = false;
  selectedTemplate: string = '';
  editableMailContent = '';
  mailContent = '';

  private service = inject(MailTemplateService);
  private emailModalService = inject(EmailConfirmationService);
  private mailService = inject(MailService);

  ngOnInit(): void {
    console.log(this.dataForEmailTab()?.personalInformationResponse?.email);
  }

  stripHtmlTags(htmlContent: string): string {
    return htmlContent.replace(/<[^>]*>/g, ''); // Regex to remove HTML tags
  }

  onTemplateSelect(): void {
    this.isEditing = true;

    const data: Partial<GeneralFormsResponse> = { ...this.dataForEmailTab() };
    let templateType: MailTemplateType | undefined;

    switch (this.selectedTemplate) {
      case 'rejected':
        this.status = Status.REJECTED;
        templateType = MailTemplateType.REJECTED;
        break;
      case 'accepted':
        this.status = Status.ACCEPTED;
        templateType = MailTemplateType.ACCEPTED;
        break;
      case 'more-info':
        this.status = Status.PENDING;
        templateType = MailTemplateType.PENDING;
        break;
      case 'cancelled':
        this.status = Status.REJECTED;
        templateType = MailTemplateType.CANCELLED;
        break;
      default:
        return;
    }

    this.service.getMailTemplate(data.ratesResponse?.id || '', templateType)
        .subscribe(value => {
          this.mailContent = value;
          this.editableMailContent = this.stripHtmlTags(value);
        });
  }

  sendMail(): void {
    this.mailService.updateStatus(this.applicationId(), this.status).subscribe((x) => console.log(x));

    if (!this.editableMailContent.trim()) {
      alert('Error: Email content is empty. Cannot send email.');
      return;
    }

    const parsedApplicationId = String(this.applicationId());
    const mailRequest: MailRequest = {
      applicationId: parsedApplicationId,
      mailSubject: `Car Leasing Application #${parsedApplicationId}`,
      mailText: this.editableMailContent,
      mailRecipient: this.dataForEmailTab()?.personalInformationResponse?.email || '',
    };

    this.mailService.sendMail(mailRequest).subscribe({
      next: (response) => {
        this.emailModalService
          .openConfirmationDialog()
      },
      error: (error) => {
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again.');
      }
    });

    this.mailService.updateStatus(this.applicationId(), this.status).subscribe({
      next: (response) => console.log('Status updated:', response),
      error: (error) => console.error('Error updating status:', error)
    });
  }
}
