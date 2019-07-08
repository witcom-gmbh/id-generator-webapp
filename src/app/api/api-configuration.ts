/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = '//id-generator.dev.witcom.services';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
