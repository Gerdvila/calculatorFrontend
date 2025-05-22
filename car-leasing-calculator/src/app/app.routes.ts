import { Routes } from '@angular/router';
import { MainContainerComponent } from './components/user/home-page/main-container.component';
import { RegistrationPageComponent } from './components/user/registration-page/registration-page.component';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginPageComponent} from './components/admin/login-page/login-page.component';
import {AdminPageComponent} from './components/admin/admin-page/admin-page.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: MainContainerComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'admin', canActivate: [AuthGuard], component: AdminPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: PageNotFoundComponent }
];
