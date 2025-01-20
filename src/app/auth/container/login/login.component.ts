import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthModel } from '../../models/AuthModel';

@Component({
  standalone: true,
  imports: [ButtonModule, FloatLabelModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  errorOccurred = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, Validators.required),
    password: new FormControl({ value: '', disabled: false }, Validators.required)
  });

  login() {
    const res = {
      email: this.loginForm.get('email')!.value as string,
      password: this.loginForm.get('password')!.value as string
    }
    this.authService.login(res).pipe(
      catchError((err) => {
        this.errorOccurred = true;
        return err;
      })
    ).subscribe((m) => {
      localStorage.setItem('auth', JSON.stringify(m));
      this.router.navigateByUrl('/invoices');
    });
  }
}
