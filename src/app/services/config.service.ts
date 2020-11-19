import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { KeycloakConfig } from 'keycloak-angular';
import {  NgxLoggerLevel, LoggerConfig } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _config: any = {};

  constructor(private http: HttpClient) { }

  get data(): any {
    return this._config ? { ...this._config } : {};
  }

  get getLogConfig():LoggerConfig{

    let logger=new LoggerConfig();
    logger.level = this._config["logLevel"] || 1;
    logger.serverLogLevel = this._config["serverLogLevel"] || 1;
    logger.serverLoggingUrl="";
    logger.disableConsoleLogging=false;
    logger.httpResponseType="json";

    return logger;

  }

  get apiConfig():any{

    let apiConfig = {
        url: this._config["apiUrl"]
    }
    return apiConfig;
  }

  get keycloakConfig():any{
    let keycloakConfig: KeycloakConfig = {
      url: this._config["keycloakUrl"],
      realm: this._config["keycloakRealm"],
      clientId: this._config["keycloakResourceId"]
    };

    return keycloakConfig;
  }

  //loadAppConfig(): Observable<any> {
  loadAppConfig() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');


    return this.http.get(`/assets/configdata/appconfig.json?cb=${new Date().getTime()}`, { headers }).toPromise()
      .then(data => {
        //console.log(data);
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            this._config[key.replace('APP_', '').toLowerCase().split('_').map((el, i) => (i > 0 ? el.charAt(0).toUpperCase() + el.slice(1) : el)).join('')] = data[key];
          }
        }
        //console.log(this._config);
        return this._config;

        //this._config = data;
    });


  }


}
