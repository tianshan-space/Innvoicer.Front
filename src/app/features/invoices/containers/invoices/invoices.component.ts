import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  imports: [ButtonModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent implements OnInit {

  private breadcrumbService = inject(BreadcrumbService);
  private router = inject(Router);

  ngOnInit() {
    this.breadcrumbService.setConfig({
      icon: 'pi pi-file-edit',
      label: 'ინვოისები'
    });
  }

  addInvoice() {
    this.router.navigateByUrl('/invoices/add');
  }
}
