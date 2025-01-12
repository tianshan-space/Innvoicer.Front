import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { ConfigService } from './core/services/config.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()), // Check
    provideHttpClient(
    //  withInterceptors([responseInterceptor, authInterceptor]),
    ),
    provideAppInitializer(()=> {
      const initFn = ((configService: ConfigService) => {
        return () => configService.getConfig()
      })(inject(ConfigService));
      return initFn();
    }),
  ]
};
