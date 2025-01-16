import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router)
  private readonly http = inject(HttpClient);
  private readonly configService = inject(ConfigService);

  isAuthenticated(): boolean {
    return true;
  }

  login(res: { email: string, password: string }) {
    return this.http.post(`${this.configService.apiUrl}/auth/login`, res);
  }
}
