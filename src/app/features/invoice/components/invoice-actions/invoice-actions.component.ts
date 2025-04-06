import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-invoice-actions',
  imports: [ButtonModule],
  templateUrl: './invoice-actions.component.html',
  styleUrl: './invoice-actions.component.scss'
})
export class InvoiceActionsComponent {

  @Input() data: any;
  @Output() confirmInvoice = new EventEmitter();

  confirm() {
    this.confirmInvoice.emit();
  }
}
