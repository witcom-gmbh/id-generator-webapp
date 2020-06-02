/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GetSequencesResponse } from '../models/get-sequences-response';
import { GetSequenceValueResponse } from '../models/get-sequence-value-response';
import { UpdateSequenceValueResponse } from '../models/update-sequence-value-response';
import { UpdateSequenceValueRequest } from '../models/update-sequence-value-request';
@Injectable({
  providedIn: 'root',
})
class SequenceService extends __BaseService {
  static readonly getSequenceDefinitionsPath = '/api/v1/sequences';
  static readonly getSequenceValuePath = '/api/v1/sequences/{key}';
  static readonly updateSequenceValuePath = '/api/v1/sequences/{key}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get all sequence definitions
   * @return Sequence value
   */
  getSequenceDefinitionsResponse(): __Observable<__StrictHttpResponse<GetSequencesResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/sequences`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GetSequencesResponse>;
      })
    );
  }
  /**
   * Get all sequence definitions
   * @return Sequence value
   */
  getSequenceDefinitions(): __Observable<GetSequencesResponse> {
    return this.getSequenceDefinitionsResponse().pipe(
      __map(_r => _r.body as GetSequencesResponse)
    );
  }

  /**
   * Get sequence value
   * @param key undefined
   * @return Sequence value
   */
  getSequenceValueResponse(key: string): __Observable<__StrictHttpResponse<GetSequenceValueResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/sequences/${key}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GetSequenceValueResponse>;
      })
    );
  }
  /**
   * Get sequence value
   * @param key undefined
   * @return Sequence value
   */
  getSequenceValue(key: string): __Observable<GetSequenceValueResponse> {
    return this.getSequenceValueResponse(key).pipe(
      __map(_r => _r.body as GetSequenceValueResponse)
    );
  }

  /**
   * Set sequnce to a new value
   * @param params The `SequenceService.UpdateSequenceValueParams` containing the following parameters:
   *
   * - `key`:
   *
   * - `body`:
   *
   * @return Sequence value updated
   */
  updateSequenceValueResponse(params: SequenceService.UpdateSequenceValueParams): __Observable<__StrictHttpResponse<UpdateSequenceValueResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/sequences/${params.key}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UpdateSequenceValueResponse>;
      })
    );
  }
  /**
   * Set sequnce to a new value
   * @param params The `SequenceService.UpdateSequenceValueParams` containing the following parameters:
   *
   * - `key`:
   *
   * - `body`:
   *
   * @return Sequence value updated
   */
  updateSequenceValue(params: SequenceService.UpdateSequenceValueParams): __Observable<UpdateSequenceValueResponse> {
    return this.updateSequenceValueResponse(params).pipe(
      __map(_r => _r.body as UpdateSequenceValueResponse)
    );
  }
}

module SequenceService {

  /**
   * Parameters for updateSequenceValue
   */
  export interface UpdateSequenceValueParams {
    key: string;
    body?: UpdateSequenceValueRequest;
  }
}

export { SequenceService }
