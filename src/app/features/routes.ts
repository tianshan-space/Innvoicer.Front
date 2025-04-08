import { Routes } from '@angular/router';

export const featureRouters: Routes = [
  {
    path: 'invoices',
    loadComponent: () =>
      import('./invoices/containers/invoices/invoices.component').then(
        (m) => m.InvoicesComponent
      ),
    title: 'ინვოისები',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/containers/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    title: 'პროფილი',
  },
  {
    path: 'companies',
    loadComponent: () =>
      import('./companies/containers/companies/companies.component').then(
        (m) => m.CompaniesComponent
      ),
    title: 'ინვოისები',
  },
  {
    path: 'invoices/add',
    loadComponent: () =>
      import('./invoices/containers/add-invoice/add-invoice.component').then(
        (m) => m.AddInvoiceComponent
      ),
    title: 'ინვოისის დამატება',
  },
  {
    path: 'invoices/edit/:id',
    loadComponent: () =>
      import('./invoices/containers/edit-invoice/edit-invoice.component').then(
        (m) => m.EditInvoiceComponent
      ),
    title: 'ინვოისის რედაქტირება',
  },
];
