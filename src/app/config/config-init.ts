import { ConfigService } from '../services/config.service';

export function loggerConfig(
  config: ConfigService
  ):any {
      return  config.getLogConfig;
}

export function appConfig(
  config: ConfigService,
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
        .catch(() => {
          reject();
        });
    });
  };
}
