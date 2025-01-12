import { Component, inject } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';

@Component({
  selector: 'app-add-invoice',
  imports: [],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.scss'
})
export class AddInvoiceComponent {

  private breadcrumbService = inject(BreadcrumbService);

  ngOnInit() {
    this.breadcrumbService.setConfig({
      icon: 'pi pi-file-edit',
      label: 'ინვოისები',
      labelRoute: '/invoices',
      childLabel: 'ახალი ინვოისი'
    });
  }

  // https://dribbble.com/shots/23454667-Invonemase-Invoice-Dashboard
}
