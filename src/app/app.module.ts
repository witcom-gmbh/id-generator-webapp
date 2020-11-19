import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER,Provider, InjectionToken} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ServicesModule } from './services/services.module';

import { ConfigService } from './services/config.service';
import { appConfig,loggerConfig } from './config/config-init';

import { LoggerModule, LoggerConfig, NGXLogger } from 'ngx-logger';
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

const ConfigDeps = new InjectionToken<(() => Function)[]>('configDeps');

export const LOGGER_PROVIDER:Provider = {
  provide: LoggerConfig,
  useFactory:loggerConfig
}

export const CONFIG_PROVIDER:Provider = {
    provide: APP_INITIALIZER,
    useFactory: appConfig,
    multi: true,
    deps: [ConfigService,ConfigDeps]
};

export function dependencyFactory(
        kcService:KeycloakService,
        kcAuthService:KeycloakAuthorizationService,
        config: ConfigService,
        apiConfigService: ApiConfiguration): any {
        return  [
          kcInitializer(kcService,kcAuthService,config),
          apiConfig(apiConfigService,config)
        ];
}

export const CONFIG_DEPENDENCIES:Provider = {
  provide: ConfigDeps,
  useFactory: dependencyFactory,
  deps: [KeycloakService,KeycloakAuthorizationService,ConfigService,ApiConfiguration]
}

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
    //LoggerModule.forRoot(environment.loggerConfig),
    //LoggerModule.forRoot(getLogConfig
    KeycloakAngularModule,
    ApiModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'})
  ],
  //providers: [CONFIG_PROVIDER ,KEYCLOAK_PROVIDER,API_PROVIDER],
  providers: [CONFIG_PROVIDER ,CONFIG_DEPENDENCIES],
  bootstrap: [AppComponent]
})
export class AppModule { }
