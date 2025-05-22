import { Component } from '@angular/core';
import { ApplicationListComponent } from '../application-list/application-list.component';
import { SingleApplicationViewComponent } from '../single-application-view/single-application-view.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {MailAndNotesComponent} from '../mail-and-notes/mail-and-notes.component';
import {StatisticsComponent} from "../statistics/statistics.component";

@Component({
  selector: 'app-admin-page',
  standalone: true,
    imports: [ApplicationListComponent, SingleApplicationViewComponent, MailAndNotesComponent, ApplicationListComponent, MailAndNotesComponent, SingleApplicationViewComponent, StatisticsComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  constructor(private authService: AuthService, private router: Router) { }

  selectedId: string | undefined;

  setSelectedId(id: string | undefined) {
    this.selectedId = id;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
