import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface IConfig {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  readonly configUrl = 'config.json';
  private _config: IConfig = { apiUrl: '' };

  public get config(): IConfig {
    return this._config;
  }
  public get apiUrl(): string {
    return this._config.apiUrl;
  }

  readonly http = inject(HttpClient);

  getConfig(): Observable<IConfig> {
    return this.http.get<IConfig>(this.configUrl).pipe(tap((config) => (this._config = config)));
  }
}
