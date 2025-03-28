import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmissionConfirmationComponent } from './form-submission-confirmation.component';

describe('FormSubmissionConfirmationComponent', () => {
  let component: FormSubmissionConfirmationComponent;
  let fixture: ComponentFixture<FormSubmissionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubmissionConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSubmissionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
