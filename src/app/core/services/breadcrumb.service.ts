import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Breadcrumb } from '../models/breadcrumbModel';

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
