/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { IdResponse } from '../models/id-response';
import { CustomerIdRequest } from '../models/customer-id-request';
import { ISIdRequest } from '../models/isid-request';
@Injectable({
  providedIn: 'root',
})
class GeneratorService extends __BaseService {
  static readonly generateCFServiceIdsPath = '/api/v1/cf-service';
  static readonly generateISServiceIdsPath = '/api/v1/is-service';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Generate Service-IDs
   * @param body undefined
   * @return Service-IDs generated
   */
  generateCFServiceIdsResponse(body?: CustomerIdRequest): __Observable<__StrictHttpResponse<IdResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/cf-service`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<IdResponse>;
      })
    );
  }
  /**
   * Generate Service-IDs
   * @param body undefined
   * @return Service-IDs generated
   */
  generateCFServiceIds(body?: CustomerIdRequest): __Observable<IdResponse> {
    return this.generateCFServiceIdsResponse(body).pipe(
      __map(_r => _r.body as IdResponse)
    );
  }

  /**
   * Generate Infrastructure Service-IDs
   * @param body undefined
   * @return IS Service-IDs created
   */
  generateISServiceIdsResponse(body?: ISIdRequest): __Observable<__StrictHttpResponse<IdResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/is-service`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<IdResponse>;
      })
    );
  }
  /**
   * Generate Infrastructure Service-IDs
   * @param body undefined
   * @return IS Service-IDs created
   */
  generateISServiceIds(body?: ISIdRequest): __Observable<IdResponse> {
    return this.generateISServiceIdsResponse(body).pipe(
      __map(_r => _r.body as IdResponse)
    );
  }
}

module GeneratorService {
}

export { GeneratorService }
