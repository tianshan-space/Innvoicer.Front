import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { catchError, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorOccurred = false;
  loading = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, Validators.required),
    password: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
  });

  login() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorOccurred = false;

    const res = {
      email: this.loginForm.get('email')!.value as string,
      password: this.loginForm.get('password')!.value as string,
    };

    this.authService
      .login(res)
      .pipe(
        catchError((err) => {
          this.errorOccurred = true;
          return err;
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((m: any) => {
        localStorage.setItem('auth', JSON.stringify(m));
        if (m.companies.length >= 1) {
          localStorage.setItem('selected', JSON.stringify(m.companies[0]));
        }
        this.router.navigateByUrl('/invoices');
      });
  }
}
