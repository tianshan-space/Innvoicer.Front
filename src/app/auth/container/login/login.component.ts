import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  imports: [ButtonModule, FloatLabelModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  errorOccurred = false;

  loginForm = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, Validators.required),
    password: new FormControl({ value: '', disabled: false }, Validators.required)
  });

  login() {
    console.log(this.loginForm.getRawValue());
  }
}
