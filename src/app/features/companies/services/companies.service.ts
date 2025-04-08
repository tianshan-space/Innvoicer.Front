import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private readonly http = inject(HttpClient);
  private readonly configService = inject(ConfigService);

  loadList(companyId: number) {
    return this.http.get(`${this.configService.apiUrl}/company`);
  }
}
