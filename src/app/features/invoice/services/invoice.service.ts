import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private readonly http = inject(HttpClient);
  private readonly configService = inject(ConfigService);

  getInvoice(key: string) {
    return this.http.get(`${this.configService.apiUrl}/invoice/key/${key}`);
  }

  confirmInvoice(id: any) {
    return this.http.put(`${this.configService.apiUrl}/invoice/complete/${id}`, {});
  }
}
