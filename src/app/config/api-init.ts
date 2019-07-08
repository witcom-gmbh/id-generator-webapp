import { environment } from '../../environments/environment';
import { ApiConfiguration } from '../api/api-configuration';

export function apiConfig(config: ApiConfiguration): Function {
  return () => {
    config.rootUrl = environment.apiConfig.url;
  };
}