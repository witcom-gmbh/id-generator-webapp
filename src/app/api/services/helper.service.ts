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
@Injectable({
  providedIn: 'root',
})
class HelperService extends __BaseService {
  static readonly getApiV1IsServiceTypePath = '/api/v1/is-service-type';
  static readonly getApiV1CfServiceTypePath = '/api/v1/cf-service-type';
  static readonly getApiV1ServiceOwnerPath = '/api/v1/service-owner';
  static readonly getApiV1ManagementDomainPath = '/api/v1/management-domain';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return List of infrastructure service-types
   */
  getApiV1IsServiceTypeResponse(): __Observable<__StrictHttpResponse<ServiceTypeResponse>> {
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
   * @return List of infrastructure service-types
   */
  getApiV1IsServiceType(): __Observable<ServiceTypeResponse> {
    return this.getApiV1IsServiceTypeResponse().pipe(
      __map(_r => _r.body as ServiceTypeResponse)
    );
  }

  /**
   * @return List of customer-facing service-types
   */
  getApiV1CfServiceTypeResponse(): __Observable<__StrictHttpResponse<ServiceTypeResponse>> {
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
   * @return List of customer-facing service-types
   */
  getApiV1CfServiceType(): __Observable<ServiceTypeResponse> {
    return this.getApiV1CfServiceTypeResponse().pipe(
      __map(_r => _r.body as ServiceTypeResponse)
    );
  }

  /**
   * @return List of service-owners
   */
  getApiV1ServiceOwnerResponse(): __Observable<__StrictHttpResponse<ServiceOwnerResponse>> {
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
   * @return List of service-owners
   */
  getApiV1ServiceOwner(): __Observable<ServiceOwnerResponse> {
    return this.getApiV1ServiceOwnerResponse().pipe(
      __map(_r => _r.body as ServiceOwnerResponse)
    );
  }

  /**
   * @return List of management-domains
   */
  getApiV1ManagementDomainResponse(): __Observable<__StrictHttpResponse<ManagementDomainResponse>> {
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
   * @return List of management-domains
   */
  getApiV1ManagementDomain(): __Observable<ManagementDomainResponse> {
    return this.getApiV1ManagementDomainResponse().pipe(
      __map(_r => _r.body as ManagementDomainResponse)
    );
  }
}

module HelperService {
}

export { HelperService }
