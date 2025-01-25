import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private readonly http = inject(HttpClient);
  private readonly configService = inject(ConfigService);

  addInvoice(invoice: any) {
    return this.http.post(`${this.configService.apiUrl}/invoice`, invoice);
  }

  loadList(companyId: number) {
    return this.http.get(`${this.configService.apiUrl}/invoice/list/${companyId}`);
  }
}
