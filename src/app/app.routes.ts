import { Routes } from '@angular/router';
import { LoginComponent } from './auth/container/login/login.component';
import { MainComponent } from './core/containers/main/main.component';
import { authGuard } from './core/guards/auth.guard';
import { featureRouters } from './features/routes';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'invoices',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [...featureRouters]
  }
];
