import { Component, inject, OnInit } from '@angular/core';
import { MainContainerComponent } from './components/user/home-page/main-container.component';
import { TranslationService } from "./services/translation.service";
import { RouterOutlet } from '@angular/router';
import {provideEcharts} from "ngx-echarts";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
      provideEcharts()
  ]

})
export class AppComponent implements OnInit {
  title = 'car-leasing-calculator';
  service = inject(TranslationService);

  ngOnInit() {
    if (localStorage.getItem('language') === null) {
      this.service.setDefaultLang('en');
    }
    else {
      this.service.setDefaultLang(localStorage.getItem('language')!);
    }
  }
}
