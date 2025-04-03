import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private readonly http = inject(HttpClient);
  private readonly configService = inject(ConfigService);

  addInvoice(invoice: any) {
    return this.http.post(`${this.configService.apiUrl}/invoice`, invoice);
  }

  updateInvoice(id: string, invoice: any) {
    return this.http.put(`${this.configService.apiUrl}/invoice/${id}`, invoice);
  }

  loadList(companyId: number) {
    return this.http.get(
      `${this.configService.apiUrl}/invoice/list/${companyId}`
    );
  }

  getInvoiceById(id: string) {
    return this.http.get(`${this.configService.apiUrl}/invoice/${id}`);
  }

  publish(id: string) {
    return this.http.put(
      `${this.configService.apiUrl}/invoice/publish/${id}`,
      {}
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.configService.apiUrl}/invoice/${id}`);
  }
}
