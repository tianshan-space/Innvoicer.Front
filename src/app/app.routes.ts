import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { featureRouters } from './features/routes';
import { LoginComponent } from './auth/container/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => import('./core/containers/main/main.component').then((m) => m.MainComponent),
    children: [...featureRouters]
  }
];
