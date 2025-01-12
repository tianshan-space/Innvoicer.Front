import { Routes } from "@angular/router";

export const featureRouters: Routes = [
  {
    path: 'invoices',
    loadChildren: () => import('./invoices/containers/invoices/invoices.component').then((m) => m.InvoicesComponent)
  }
];
