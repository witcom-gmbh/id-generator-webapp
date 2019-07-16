import { KeycloakService } from 'keycloak-angular';
import {KeycloakAuthorizationService} from 'keycloak-authz-angular';
import { environment } from '../../environments/environment';

export function kcInitializer(keycloak: KeycloakService,authService:KeycloakAuthorizationService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: environment.keycloakConfig,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          }, 
          bearerPrefix: 'Bearer',
          bearerExcludedUrls: []
        });
        await authService.init({
          config: environment.keycloakConfig,
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
