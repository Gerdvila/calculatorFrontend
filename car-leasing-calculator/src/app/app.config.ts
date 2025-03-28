import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './interceptors/auth.interceptor';
import {AppTranslateModule} from "./modules/app-translate.module";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(AppTranslateModule.forRoot())
  ]
};
