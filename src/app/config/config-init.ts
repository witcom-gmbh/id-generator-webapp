import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { AlertService } from 'ngx-alerts';

export function loggerConfig(
  config: ConfigService
  ):any {
      return  config.getLogConfig;
}

export function appConfig(
  config: ConfigService,
  alertService: AlertService,
  configDeps: (() => Function)[]
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
        config.loadAppConfig().then(data =>{
          return Promise.all(configDeps.map(dep => dep()));
        })
        .then(() => {
          // Once configuration dependencies are resolved, then resolve factory
          resolve();
        })
        .catch((data) => {
          console.log("App-Init error: " + data);

          alertService.danger("Applikation konnte nicht initialisiert werden !!");
          resolve(data);
        });
    });
  };
}
