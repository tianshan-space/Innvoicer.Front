import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../../auth/services/auth.service';
import { catchError, finalize } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private breadcrumbService = inject(BreadcrumbService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  updatePasswordForm: FormGroup;

  errorOccurred = false;
  loading = false;

  constructor() {
    this.updatePasswordForm = new FormGroup(
      {
        currentPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        repeatNewPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.breadcrumbService.setConfig({
      icon: 'pi pi-user',
      label: 'პროფილი',
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const repeatNewPassword = control.get('repeatNewPassword')?.value;

    if (newPassword && repeatNewPassword && newPassword !== repeatNewPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  updatePassword() {
    if (this.updatePasswordForm.invalid) {
      return;
    }

    const currentPassword =
      this.updatePasswordForm.get('currentPassword')?.value;
    const newPassword = this.updatePasswordForm.get('newPassword')?.value;

    this.authService
      .updatePassword(currentPassword, newPassword)
      .pipe(
        catchError((err) => {
          this.errorOccurred = true;
          return err;
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'პაროლი წარმატებით შეიცვალა',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'შეცდომა პაროლის განახლებისას, სცადე მოგვიანებით',
          });
        }
      );
  }
}
