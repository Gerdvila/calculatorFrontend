import { Component } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {
}
