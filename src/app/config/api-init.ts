import { ApiConfiguration } from '../api/api-configuration';
import { ConfigService } from '../services/config.service';

export function apiConfig(config: ApiConfiguration,configService:ConfigService): Function {
  return () => {
    config.rootUrl = configService.apiConfig.url;
  };
}
