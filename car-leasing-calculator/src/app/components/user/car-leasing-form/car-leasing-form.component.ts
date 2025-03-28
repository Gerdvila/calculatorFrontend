import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription, of, switchMap, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Details, Model, Variant } from '../../../types';
import { LeasingFormService } from '../../../services/leasing-form-service.service';
import { FormSubmissionConfirmationService } from '../../../services/form-submission-confirmation.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormDataTransferService } from '../../../services/form-data-transfer.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-car-leasing-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    MatButtonModule,
    MatCheckboxModule,
    TranslateModule,
  ],
  templateUrl: './car-leasing-form.component.html',
  styleUrl: './car-leasing-form.component.scss',
})
export class CarLeasingFormComponent implements OnInit {
  carLeasingForm!: FormGroup;
  carMakes$!: Observable<string[]>;
  carModels$ = new BehaviorSubject<Model[]>([]);
  carModelVariants$!: Observable<Variant[]>;
  carDetails$!: Observable<Details | null>;
  selectedFile: File | null = null;
  maxFileSize = 3 * 1024 * 1024;
  correctFile: boolean = true;
  correctFileSize: boolean = true;
  subscription: Subscription | undefined;

  private transferService = inject(FormDataTransferService);
  private makeChange$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private leasingFormService: LeasingFormService,
    private submissionConfirmationService: FormSubmissionConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carMakes$ = this.leasingFormService.getCarMakes();

    this.carLeasingForm = this.formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      modelVariant: [''],
      year: ['', Validators.required],
      fuelType: ['', Validators.required],
      enginePower: ['', Validators.required],
      engineSize: ['', Validators.required],
      url: [''],
      offer: [''],
      terms: [false, Validators.requiredTrue],
      confirmation: [false, Validators.requiredTrue],
    });

    const makeControl = this.carLeasingForm.get('make');

    if (makeControl) {
      makeControl.valueChanges.subscribe(() => {
        this.carLeasingForm.patchValue({
          model: '',
          modelVariant: '',
          year: '',
          fuelType: '',
          enginePower: '',
          engineSize: '',
          url: '',
          offer: '',
          terms: false,
          confirmation: false,
        });
        this.makeChange$.next();
      });
    }

    if (makeControl) {
      makeControl.valueChanges
        .pipe(
          switchMap((selectedMake) => {
            return this.leasingFormService.getModelsForMake(selectedMake);
          })
        )
        .subscribe((models) => {
          this.carModels$.next(models);
        });
    }
  }

  onSelectModel() {
    const modelControl = this.carLeasingForm.get('model');

    if (modelControl) {
      const selectedModelName = modelControl.value;

      this.leasingFormService
        .findModelByName(selectedModelName, this.carModels$)
        .pipe(
          switchMap((model) =>
            this.leasingFormService.getInfoForModel(model.id)
          ),
          takeUntil(this.makeChange$)
        )
        .subscribe((response) => {
          this.carModelVariants$ = of(response.variants);
          this.carDetails$ = of(response.details);
          this.checkDetailsForOnlyValues(response.details);
        });
    }
  }

  onSelectModelVariant() {
    const variantControl = this.carLeasingForm.get('modelVariant');

    if (variantControl) {
      const selectedVariantName = variantControl.value;

      this.leasingFormService
        .findVariantByName(selectedVariantName, this.carModelVariants$)
        .pipe(
          switchMap((variant) =>
            this.leasingFormService.getInfoForVariant(variant.id)
          )
        )
        .subscribe((response) => {
          this.carDetails$ = of(response);
          this.checkDetailsForOnlyValues(response);
        });
    }
  }

  onSubmit(): void {
    if (this.carLeasingForm.valid) {
      this.transferService.setCarLeaseData(this.carLeasingForm.value);

      this.subscription = this.transferService.postAllFormData()
        .subscribe({
          next: (data) => console.log(data),
          error: (error) => console.error('Error:', error)
        });

      this.submissionConfirmationService
        .openConfirmationDialog()
        .afterClosed()
        .subscribe((result) => {
          this.router.navigate(['/']);
        });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0] ?? null;
    this.correctFile = true;
    this.correctFileSize = true;
    if (file) {
      if (file.size > this.maxFileSize) {
        this.correctFileSize = false;
        this.selectedFile = null;
        return;
      }
      if (file.type !== 'application/pdf') {
        this.correctFile = false;
        this.selectedFile = null;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arr = new Uint8Array(e.target.result).subarray(0, 5);
        const header = String.fromCharCode.apply(null, Array.from(arr));
        if (header !== '%PDF-') {
          this.correctFile = false;
          return;
        }
        this.selectedFile = file;
        this.convertFileToBase64(file, (base64: string) => {
          this.carLeasingForm.patchValue({ offer: base64 });
        });
      };

      reader.onerror = (err) => {
        console.error('Error reading file:', err);
        this.selectedFile = null;
      };

      reader.readAsArrayBuffer(file.slice(0, 5));
    } else {
      this.selectedFile = null;
    }
  }

  getButtonColor() {
    return this.carLeasingForm.valid ? 'primary' : 'warn';
  }

  convertFileToBase64(file: File, callback: (result: string) => void): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      callback(base64String.split(',')[1]);
    };
    reader.onerror = (error) => {
      console.error('Error converting file:', error);
    };
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
}
  checkDetailsForOnlyValues(details: Details) {
    if (details) {
      if (details.years.length === 1) {
        this.carLeasingForm.get('year')!.setValue(details.years[0]);
      }
      if (details.fuelTypes.length === 1) {
        this.carLeasingForm.get('fuelType')!.setValue(details.fuelTypes[0]);
      }
      if (details.enginePowers.length === 1) {
        this.carLeasingForm
          .get('enginePower')!
          .setValue(details.enginePowers[0]);
      }
      if (details.engineSizes.length === 1) {
        this.carLeasingForm.get('engineSize')!.setValue(details.engineSizes[0]);
      }
    }
  }
}
