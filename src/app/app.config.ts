import { ApplicationConfig, inject, LOCALE_ID, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { ConfigService } from './core/services/config.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora';
import Lara from '@primeng/themes/lara';
import { authInterceptor } from './auth/interceptors/auth.interceptor';
import localeKa from '@angular/common/locales/ka';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeKa, 'ka');

const MyPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{indigo.50}',
        100: '{indigo.100}',
        200: '{indigo.200}',
        300: '{indigo.300}',
        400: '{indigo.400}',
        500: '{indigo.500}',
        600: '{indigo.600}',
        700: '{indigo.700}',
        800: '{indigo.800}',
        900: '{indigo.900}',
        950: '{indigo.950}'
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: { darkModeSelector: ".fake-dark-selector" }
      }
    }),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
    provideAppInitializer(()=> {
      const initFn = ((configService: ConfigService) => {
        return () => configService.getConfig()
      })(inject(ConfigService));
      return initFn();
    }),
    {
      provide: LOCALE_ID,
      useValue: 'ka',
    }
  ]
};
