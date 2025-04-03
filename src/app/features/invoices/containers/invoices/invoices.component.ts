import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { Router } from '@angular/router';
import { InvoicesService } from '../../services/invoices.service';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-invoices',
  imports: [
    ButtonModule,
    TableModule,
    DatePipe,
    TooltipModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent implements OnInit {
  data: any = [];

  private breadcrumbService = inject(BreadcrumbService);
  private invoicesService = inject(InvoicesService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.breadcrumbService.setConfig({
      icon: 'pi pi-file-edit',
      label: 'ინვოისები',
    });

    this.loadList();
  }

  loadList() {
    const selected = JSON.parse(localStorage.getItem('selected')!);
    this.invoicesService.loadList(selected.id).subscribe((m) => {
      this.data = m as any;
      this.data = this.data.reverse();
    });
  }

  convertStatus(id: number) {
    switch (id) {
      case 0:
        return 'Draft';
      case 1:
        return 'Pending';
      case 2:
        return 'Completed';
      default:
        return '';
    }
  }

  addInvoice() {
    this.router.navigateByUrl('/invoices/add');
  }

  editInvoice(id: any) {
    this.router.navigateByUrl('/invoices/edit/' + id);
  }

  sendInvoice(id: any) {
    this.confirmationService.confirm({
      message: 'ნამდვილად გსურს ინვოისის გაგზავნა?',
      header: 'ინვოისის გაგზავნა',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'გაუქმება',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'გაგზავნა',
      },
      accept: () => {
        this.invoicesService.publish(id).subscribe((m) => {
          this.data = m as any;
          this.data = this.data.reverse();
        });
        this.confirmationService.close();

        this.data = [];
        this.loadList();
      },
      reject: () => {
        console.log(2);
      },
    });
  }

  deleteInvoice(id: any) {
    this.confirmationService.confirm({
      message: 'ნამდვილად გსურს ინვოისის წაშლა?',
      header: 'ინვოისის წაშლა',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'გაუქმება',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'წაშლა',
      },
      accept: () => {
        this.invoicesService.delete(id).subscribe((m) => {});
        this.confirmationService.close();
        this.data = [];
        this.loadList();
      },
      reject: () => {
        console.log(2);
      },
    });
  }
}
