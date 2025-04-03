import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { InvoicesService } from '../../services/invoices.service';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit-invoice',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    DatePickerModule,
    TooltipModule,
    ToastModule,
  ],
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss'],
})
export class EditInvoiceComponent {
  id: string | null = null;
  invoiceForm = new FormGroup({
    companyId: new FormControl(null, Validators.required),
    issueDate: new FormControl(null, Validators.required),
    dueDate: new FormControl(null, Validators.required),
    totalAmount: new FormControl(
      { value: 0, disabled: true },
      Validators.required
    ),
    depositAmount: new FormControl(null, Validators.required),
    items: new FormArray([]),
    client: new FormGroup({
      name: new FormControl('', Validators.required),
      personalId: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      address: new FormControl(''),
    }),
  });

  private breadcrumbService = inject(BreadcrumbService);
  private invoicesService = inject(InvoicesService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.breadcrumbService.setConfig({
      icon: 'pi pi-file-edit',
      label: 'ინვოისები',
      labelRoute: '/invoices',
      childLabel: 'ინვოისის რედაქტირება',
    });

    const invoiceId = this.route.snapshot.paramMap.get('id');
    this.id = invoiceId ? invoiceId : null;
    if (invoiceId) {
      this.loadInvoice(invoiceId);
    }
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    const itemGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      unitPrice: new FormControl(0, Validators.required),
      quantity: new FormControl(1, Validators.required),
      currency: new FormControl('GEL', Validators.required),
      checkInDate: new FormControl(null, Validators.required),
      checkOutDate: new FormControl(null, Validators.required),
    });

    this.items.push(itemGroup);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.processTotal();
  }

  processTotal() {
    // დღეების რეოდენობის მიხედვით გამოთვლა
    let totalAmount = this.items.value.reduce((acc: any, item: any) => {
      return acc + ((item.unitPrice * item.quantity) * (item.checkOutDate - item.checkInDate) / 24/ 60/ 60 / 1000);
    }, 0);

    if (totalAmount < 0) {
      totalAmount = 0;
    }

    this.invoiceForm.get('totalAmount')!.setValue(totalAmount);
  }

  loadInvoice(invoiceId: string): void {
    this.invoicesService.getInvoiceById(invoiceId).subscribe((invoice: any) => {
      this.invoiceForm.patchValue(invoice);
      this.items.clear();

      invoice.items.forEach((item: any) => {
        const itemGroup = new FormGroup({
          name: new FormControl(item.name, Validators.required),
          unitPrice: new FormControl(item.unitPrice, Validators.required),
          quantity: new FormControl(item.quantity, Validators.required),
          currency: new FormControl(item.currency, Validators.required),
          checkInDate: new FormControl(new Date(item.checkInDate), Validators.required),
          checkOutDate: new FormControl(new Date(item.checkOutDate), Validators.required),
        });
        this.items.push(itemGroup);
      });
    });
  }

  onSubmit(): void {
    const data = this.invoiceForm.getRawValue();
    console.log(data);
    if (this.invoiceForm.valid && this.id) {
      this.invoicesService
        .updateInvoice(this.id, data)
        .pipe(
          catchError((err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'დაფიქსირდა შეცდომა',
            });
            return err;
          })
        )
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'ინვოისი წარმატებით განახლდა',
          });
          this.router.navigate(['/invoices']);
        });
    }
  }
}
