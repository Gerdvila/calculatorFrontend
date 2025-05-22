import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailAndNotesComponent } from './mail-and-notes.component';

describe('MailAndNotesComponent', () => {
  let component: MailAndNotesComponent;
  let fixture: ComponentFixture<MailAndNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailAndNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailAndNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
