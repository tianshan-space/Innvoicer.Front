import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  config = new Subject<Breadcrumb>();

  setConfig(config: Breadcrumb): void {
    this.config.next(config);
  }

  getConfig(): Observable<Breadcrumb> {
    return this.config.asObservable();
  }
}

export interface Breadcrumb {
  icon: string;
  label: string;
  childLabel?: string;
  labelRoute?: string;
}
