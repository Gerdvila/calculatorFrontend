import { Component, inject, OnInit } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslationService } from "../../../services/translation.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatSelectModule, MatOptionModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  translateService = inject(TranslationService);
  selected: string;

  constructor() {
    if (!localStorage.getItem('language')) {
      this.selected = 'united-kingdom';
    }
    else {
      this.selected = localStorage.getItem('language')!;
    }
  }

  ngOnInit() {
    if (!localStorage.getItem('language')) {
      this.translateService.setDefaultLang('united-kingdom');
    }
    else {
      this.translateService.setDefaultLang(localStorage.getItem('language')!);
    }
  }

  onChange(value: string) {
    localStorage.setItem('language', value);
    this.updateLanguage();
  }

  private updateLanguage() {
    this.translateService.setDefaultLang(localStorage.getItem('language')!);
  }
}
