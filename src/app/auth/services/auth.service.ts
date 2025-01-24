import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthModel } from '../models/AuthModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly configService = inject(ConfigService);

  isAuthenticated(): boolean {
    const auth: AuthModel = JSON.parse(localStorage.getItem('auth')!);
    if (auth) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  login(res: { email: string; password: string }): Observable<AuthModel> {
    return this.http.post<AuthModel>(
      `${this.configService.apiUrl}/auth/login`,
      res
    );
  }

  updatePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const body = {
      currentPassword,
      newPassword,
    };

    return this.http.put<any>(
      `${this.configService.apiUrl}/user/update-password`,
      body
    );
  }
}
