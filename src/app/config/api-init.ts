import { ApiConfiguration } from '../api/api-configuration';
import { ConfigService } from '../services/config.service';
import t from 'typy';

export function apiConfig(config: ApiConfiguration,configService:ConfigService): Function {
  return () => {
    if(t(configService.apiConfig.url).isUndefined){
      config.rootUrl = "";
    } else {
      config.rootUrl = configService.apiConfig.url;
    }
    
  };
}
