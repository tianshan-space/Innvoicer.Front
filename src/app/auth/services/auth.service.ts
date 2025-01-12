import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly router = inject(Router)

  isAuthenticated(): boolean {
    // this.router.navigate(['/login']);
    return true;
  }
}
