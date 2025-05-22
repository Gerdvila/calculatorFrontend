import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleApplicationViewComponent } from './single-application-view.component';

describe('SingleApplicationViewComponent', () => {
  let component: SingleApplicationViewComponent;
  let fixture: ComponentFixture<SingleApplicationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleApplicationViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleApplicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
