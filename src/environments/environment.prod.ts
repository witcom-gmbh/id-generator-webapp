
import {  NgxLoggerLevel } from 'ngx-logger';
import { KeycloakConfig } from 'keycloak-angular';

let LOGGER_CONFIG = {
    //serverLoggingUrl: '/api/logs',
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.OFF
};

// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
  url: "https://auth.dev.witcom.services/auth",
  realm: "witcom",
  clientId: "id-generator-webapp"
};

let apiConfig = {
    url: "https://apis.dev.witcom.services/id-generator"
    
}

export const environment = {
  production: true,
  apiUrl:"https://apis.dev.witcom.services/id-generator",
  loggerConfig:LOGGER_CONFIG,
  keycloakConfig: keycloakConfig,
  apiConfig: apiConfig
};
