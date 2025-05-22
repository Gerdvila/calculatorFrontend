import { Component } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIcon,
    MatProgressSpinner,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm: FormGroup;
  loginFailed: boolean = false;
  passwordHidden: boolean = true;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    this.isLoading = true;
    this.authService.postLogin(this.loginForm).subscribe({
      next: (data) => {
        this.authService.setToken(data.token);
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.isLoading = false;
        this.clear();

      }
    });
    this.loginFailed = true;
  }

  clear(): void {
    this.loginForm.reset();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

