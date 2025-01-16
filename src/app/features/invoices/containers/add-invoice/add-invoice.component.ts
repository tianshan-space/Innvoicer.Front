import { Component, inject } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-invoice',
  imports: [InputTextModule, ButtonModule, FormsModule],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.scss'
})
export class AddInvoiceComponent {

  private breadcrumbService = inject(BreadcrumbService);

  name = '';
  lastName = '';
  phone = '';
  email = '';


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
