import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { InvoicesService } from '../../services/invoices.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-invoice',
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
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.scss',
})
export class AddInvoiceComponent {
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
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{9}$/),
      ]),
      address: new FormControl(''),
    }),
  });

  private breadcrumbService = inject(BreadcrumbService);
  private invoicesService = inject(InvoicesService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  ngOnInit() {
    this.breadcrumbService.setConfig({
      icon: 'pi pi-file-edit',
      label: 'ინვოისები',
      labelRoute: '/invoices',
      childLabel: 'ახალი ინვოისი',
    });

    this.addItem();

    const selected = JSON.parse(localStorage.getItem('selected')!);
    this.invoiceForm.get('companyId')!.setValue(selected.id);
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

  getCheckinDate(i: number) {
    if (this.invoiceForm?.get('items')?.value?.[i]) {
      const date = this.invoiceForm?.get('items')?.value?.[i] as any;
      const dateToNumb = new Date(date.checkInDate).getTime() + 86400000;
      const resDate = new Date(dateToNumb);
      return resDate;
    } else return new Date();
  }

  processTotal() {
    // დღეების რეოდენობის მიხედვით გამოთვლა
    let totalAmount = this.items.value.reduce((acc: any, item: any) => {
      return (
        acc +
        (item.unitPrice *
          item.quantity *
          (item.checkOutDate - item.checkInDate)) /
          24 /
          60 /
          60 /
          1000
      );
    }, 0);

    if (totalAmount < 0) {
      totalAmount = 0;
    }

    this.invoiceForm.get('totalAmount')!.setValue(totalAmount);
  }

  onSubmit(): void {
    const data = this.invoiceForm.getRawValue();
    this.invoicesService
      .addInvoice(data)
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
      .subscribe((m) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'ინვოისი წარმატებით დაემატა',
        });
        this.router.navigate(['/invoices']);
      });
  }
}
