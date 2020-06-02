import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER,Provider} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ServicesModule } from './services/services.module';

import { LoggerModule } from 'ngx-logger';
import { AlertModule } from 'ngx-alerts';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
//import {KeycloakAuthorizationService} from '@idapp/services/services';
import {KeycloakAuthorizationService} from 'keycloak-authz-angular';
import { kcInitializer } from './config/kc-init';

import { ApiConfiguration } from './api/api-configuration';
import { ApiModule } from './api/api.module';
import { apiConfig} from './config/api-init'

import { environment } from '../environments/environment';

import {TabViewModule} from 'primeng/tabview';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';

import { HomeComponent } from './home/home.component';
import { HasKeycloakAuthorizationDirective } from './shared/has-keycloak-authorization.directive';
import { KeycloakAuthzAngularModule } from 'keycloak-authz-angular';
import { AuthztestComponent } from './authztest/authztest.component';

export const KEYCLOAK_PROVIDER: Provider = {
    provide: APP_INITIALIZER,
    useFactory: kcInitializer,
    multi: true,
    deps: [KeycloakService,KeycloakAuthorizationService]
};

export const API_PROVIDER: Provider = {
    provide: APP_INITIALIZER,
    useFactory: apiConfig,
    multi: true,
    deps: [ApiConfiguration]
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HasKeycloakAuthorizationDirective,
    AuthztestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TabViewModule,
    PanelModule,
    ButtonModule,
    SharedModule,
    DropdownModule,
    KeycloakAuthzAngularModule,
    LoggerModule.forRoot(environment.loggerConfig),
    KeycloakAngularModule,
    ApiModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'})
  ],
  providers: [KEYCLOAK_PROVIDER,API_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
