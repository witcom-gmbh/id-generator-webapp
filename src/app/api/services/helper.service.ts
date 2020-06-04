/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ServiceTypeResponse } from '../models/service-type-response';
import { ServiceOwnerResponse } from '../models/service-owner-response';
import { ManagementDomainResponse } from '../models/management-domain-response';
import { ServiceTemplateResponse } from '../models/service-template-response';
@Injectable({
  providedIn: 'root',
})
class HelperService extends __BaseService {
  static readonly getIsServiceTypesPath = '/api/v1/is-service-type';
  static readonly getCFServiceTypesPath = '/api/v1/cf-service-type';
  static readonly getServiceOwnersPath = '/api/v1/service-owner';
  static readonly getManagementDomainsPath = '/api/v1/management-domain';
  static readonly getServiceTemplatesPath = '/api/v1/service-template';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get Infrastructure Service-Types
   * @return List of infrastructure service-types
   */
  getIsServiceTypesResponse(): __Observable<__StrictHttpResponse<ServiceTypeResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/is-service-type`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceTypeResponse>;
      })
    );
  }
  /**
   * Get Infrastructure Service-Types
   * @return List of infrastructure service-types
   */
  getIsServiceTypes(): __Observable<ServiceTypeResponse> {
    return this.getIsServiceTypesResponse().pipe(
      __map(_r => _r.body as ServiceTypeResponse)
    );
  }

  /**
   * Get customer-facing Service-Types
   * @return List of customer-facing service-types
   */
  getCFServiceTypesResponse(): __Observable<__StrictHttpResponse<ServiceTypeResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/cf-service-type`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceTypeResponse>;
      })
    );
  }
  /**
   * Get customer-facing Service-Types
   * @return List of customer-facing service-types
   */
  getCFServiceTypes(): __Observable<ServiceTypeResponse> {
    return this.getCFServiceTypesResponse().pipe(
      __map(_r => _r.body as ServiceTypeResponse)
    );
  }

  /**
   * Get service-owners
   * @return List of service-owners
   */
  getServiceOwnersResponse(): __Observable<__StrictHttpResponse<ServiceOwnerResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/service-owner`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceOwnerResponse>;
      })
    );
  }
  /**
   * Get service-owners
   * @return List of service-owners
   */
  getServiceOwners(): __Observable<ServiceOwnerResponse> {
    return this.getServiceOwnersResponse().pipe(
      __map(_r => _r.body as ServiceOwnerResponse)
    );
  }

  /**
   * Get management-domains
   * @return List of management-domains
   */
  getManagementDomainsResponse(): __Observable<__StrictHttpResponse<ManagementDomainResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/management-domain`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ManagementDomainResponse>;
      })
    );
  }
  /**
   * Get management-domains
   * @return List of management-domains
   */
  getManagementDomains(): __Observable<ManagementDomainResponse> {
    return this.getManagementDomainsResponse().pipe(
      __map(_r => _r.body as ManagementDomainResponse)
    );
  }

  /**
   * Get service-templates
   * @return List of service-Templates
   */
  getServiceTemplatesResponse(): __Observable<__StrictHttpResponse<ServiceTemplateResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/service-template`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceTemplateResponse>;
      })
    );
  }
  /**
   * Get service-templates
   * @return List of service-Templates
   */
  getServiceTemplates(): __Observable<ServiceTemplateResponse> {
    return this.getServiceTemplatesResponse().pipe(
      __map(_r => _r.body as ServiceTemplateResponse)
    );
  }
}

module HelperService {
}

export { HelperService }
