import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { Router } from '@angular/router';
import { InvoicesService } from '../../services/invoices.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-invoices',
  imports: [ButtonModule, TableModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent implements OnInit {

  data = [];

  private breadcrumbService = inject(BreadcrumbService);
  private invoicesService = inject(InvoicesService);
  private router = inject(Router);

  ngOnInit() {
    this.breadcrumbService.setConfig({
      icon: 'pi pi-file-edit',
      label: 'ინვოისები'
    });

    const selected = JSON.parse(localStorage.getItem('selected')!);
    this.invoicesService.loadList(selected.id).subscribe((m) => {
      this.data = m as any;
    });
  }

  addInvoice() {
    this.router.navigateByUrl('/invoices/add');
  }
}
