import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarLeasingCalculatorComponent } from '../car-leasing-calculator/car-leasing-calculator.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { FooterComponent } from '../../general/footer/footer.component';
import { HeaderComponent } from '../../general/header/header.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  imports: [RouterOutlet, HowItWorksComponent, CarLeasingCalculatorComponent, FooterComponent, HeaderComponent],
})
export class MainContainerComponent { }
