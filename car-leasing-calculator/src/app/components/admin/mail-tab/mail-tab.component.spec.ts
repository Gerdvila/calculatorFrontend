import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailTabComponent } from './mail-tab.component';

describe('MailComponent', () => {
  let component: MailTabComponent;
  let fixture: ComponentFixture<MailTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailTabComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
