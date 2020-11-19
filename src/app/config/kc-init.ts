import { KeycloakService } from 'keycloak-angular';
import {KeycloakAuthorizationService} from 'keycloak-authz-angular';
import { ConfigService } from '../services/config.service';

export function kcInitializer(keycloak: KeycloakService,authService:KeycloakAuthorizationService,configService:ConfigService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
//console.log(configService);
        await keycloak.init({
          config: configService.keycloakConfig,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          bearerPrefix: 'Bearer',
          bearerExcludedUrls: []
        });
        await authService.init({
          config: configService.keycloakConfig,
          initOptions: {
            defaultResourceServerId: 'id-generator-service'
          }});
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
