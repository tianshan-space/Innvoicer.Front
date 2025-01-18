import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';

@Component({
  selector: 'app-add-invoice',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, FormsModule, DatePickerModule, TooltipModule],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.scss'
})
export class AddInvoiceComponent {

  invoiceForm = new FormGroup({
    companyId: new FormControl(null, Validators.required),
    issueDate: new FormControl(null, Validators.required),
    dueDate: new FormControl(null, Validators.required),
    totalAmount: new FormControl({ value: 0, disabled: true }, Validators.required),
    depositAmount: new FormControl(null, Validators.required),
    items: new FormArray([]),
    client: new FormGroup({
      name: new FormControl('', Validators.required),
      personalId: new FormControl('', Validators.required),
      address: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
    }),
  });

  private breadcrumbService = inject(BreadcrumbService);

  ngOnInit() {
    this.breadcrumbService.setConfig({
      icon: 'pi pi-file-edit',
      label: 'ინვოისები',
      labelRoute: '/invoices',
      childLabel: 'ახალი ინვოისი'
    });

    this.addItem();
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    const itemGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      unitPrice: new FormControl(0, Validators.required),
      quantity: new FormControl(1, Validators.required),
      currency: new FormControl('USD', Validators.required),
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
    const totalAmount = this.items.value.reduce((acc: any, item: any) => {
      return acc + (item.unitPrice * item.quantity);
    }, 0);

    this.invoiceForm.get('totalAmount')!.setValue(totalAmount);
  }

  onSubmit(): void {
    console.log(this.invoiceForm.value);
  }
}
