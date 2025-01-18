import { Component } from '@angular/core';
import { InvoiceActionsComponent } from '../../components/invoice-actions/invoice-actions.component';

@Component({
  selector: 'app-invoice',
  imports: [InvoiceActionsComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {

  data = {
    "id": 1,
    "key": "INV-2025-0001",
    "number": "123456",
    "companyId": 101,
    "clientId": 202,
    "issueDate": "2025-01-18T13:42:29.315Z",
    "dueDate": "2025-02-01T13:42:29.315Z",
    "status": 1,
    "totalAmount": 1500,
    "depositAmount": 300,
    "createdAt": "2025-01-18T13:42:29.315Z",
    "updatedAt": "2025-01-18T13:42:29.315Z",
    "client": {
      "name": "John Doe",
      "personalId": "987654321",
      "address": "123 Elm Street, Springfield, USA",
      "email": "johndoe@example.com",
      "phone": "+1 234-567-8900"
    },
    "company": {
      "id": 101,
      "name": "Tech Solutions Ltd.",
      "logo": "https://example.com/logo.png",
      "vatOrPersonalCode": "US123456789",
      "streetAddress": "456 Main Street",
      "city": "New York",
      "postalCode": "10001",
      "country": "USA",
      "additionalInformation": "Providing innovative tech solutions since 2010.",
      "bankAccounts": [
        {
          "bankName": "First National Bank",
          "swift": "FNB123456",
          "iban": "US12FNB12345678901234"
        }
      ]
    },
    "items": [
      {
        "name": "Premium Software License",
        "unitPrice": 500,
        "quantity": 2,
        "currency": "USD",
        "totalPrice": 1000,
        "checkInDate": "2025-01-18T13:42:29.315Z",
        "checkOutDate": "2025-01-25T13:42:29.315Z",
        "nights": 7
      },
      {
        "name": "On-site Setup Service",
        "unitPrice": 500,
        "quantity": 1,
        "currency": "USD",
        "totalPrice": 500,
        "checkInDate": "2025-01-20T09:00:00.000Z",
        "checkOutDate": "2025-01-20T17:00:00.000Z",
        "nights": 0
      }
    ]
  };

}
