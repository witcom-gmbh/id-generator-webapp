import { NgModule,forwardRef,Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './api.interceptor';
import { ErrorHandlerService } from './error-handler.service';
import { KeycloakAuthorizationService } from './keycloak-authorization.service';
import { ConfigService } from './config.service';

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};


@NgModule({
  declarations: [],
  providers: [
    ErrorHandlerService,
    ConfigService,
    KeycloakAuthorizationService,
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER
  ],
  imports: [
    CommonModule
  ]
})
export class ServicesModule { }
