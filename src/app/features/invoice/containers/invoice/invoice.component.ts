import { Component, inject, OnInit } from '@angular/core';
import { InvoiceActionsComponent } from '../../components/invoice-actions/invoice-actions.component';
import { InvoiceService } from '../../services/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { ViewInvoiceComponent } from '../../../../shared/components/view-invoice/view-invoice.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-invoice',
  imports: [InvoiceActionsComponent, ViewInvoiceComponent, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent implements OnInit{

  data: any;

  private readonly route = inject(ActivatedRoute);
  private readonly invoiceService = inject(InvoiceService);
  private readonly confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceService.getInvoice(id).subscribe(invoice => {
        if (invoice) {
          this.data = invoice;
          if (this.data.items && Array.isArray(this.data.items)) {
            this.data.items = this.data.items.map((item: any, index: any) => ({
              ...item,
              id: index + 1
            }));
          }
          console.log(invoice);
        }
      });
    }
  }

  confirmInvoice() {
    this.confirmationService.confirm({
      message: 'ნამდვილად გსურს ინვოისის დადასტურება?',
      header: 'ინვოისის დასტური',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'გაუქმება',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'დადასტურება',
      },
      accept: () => {
        this.invoiceService.confirmInvoice(this.data.id).subscribe((res) => {
          console.log(res);
        });
      },
      reject: () => {
        console.log(2);
      },
    });
  }
}
