/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UpdateSequenceValueResponse } from '../models/update-sequence-value-response';
import { UpdateSequenceValueRequest } from '../models/update-sequence-value-request';
import { GetSequenceValueResponse } from '../models/get-sequence-value-response';
import { GetSequencesResponse } from '../models/get-sequences-response';
@Injectable({
  providedIn: 'root',
})
class SequenceService extends __BaseService {
  static readonly putApiV1SequencesKeyPath = '/api/v1/sequences/{key}';
  static readonly getApiV1SequencesKeyPath = '/api/v1/sequences/{key}';
  static readonly getApiV1SequencesPath = '/api/v1/sequences';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `SequenceService.PutApiV1SequencesKeyParams` containing the following parameters:
   *
   * - `key`:
   *
   * - `body`:
   *
   * @return Sequence value updated
   */
  putApiV1SequencesKeyResponse(params: SequenceService.PutApiV1SequencesKeyParams): __Observable<__StrictHttpResponse<UpdateSequenceValueResponse>> {
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
   * @param params The `SequenceService.PutApiV1SequencesKeyParams` containing the following parameters:
   *
   * - `key`:
   *
   * - `body`:
   *
   * @return Sequence value updated
   */
  putApiV1SequencesKey(params: SequenceService.PutApiV1SequencesKeyParams): __Observable<UpdateSequenceValueResponse> {
    return this.putApiV1SequencesKeyResponse(params).pipe(
      __map(_r => _r.body as UpdateSequenceValueResponse)
    );
  }

  /**
   * @param key undefined
   * @return Sequence value
   */
  getApiV1SequencesKeyResponse(key: string): __Observable<__StrictHttpResponse<GetSequenceValueResponse>> {
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
   * @param key undefined
   * @return Sequence value
   */
  getApiV1SequencesKey(key: string): __Observable<GetSequenceValueResponse> {
    return this.getApiV1SequencesKeyResponse(key).pipe(
      __map(_r => _r.body as GetSequenceValueResponse)
    );
  }

  /**
   * @return Sequence value
   */
  getApiV1SequencesResponse(): __Observable<__StrictHttpResponse<GetSequencesResponse>> {
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
   * @return Sequence value
   */
  getApiV1Sequences(): __Observable<GetSequencesResponse> {
    return this.getApiV1SequencesResponse().pipe(
      __map(_r => _r.body as GetSequencesResponse)
    );
  }
}

module SequenceService {

  /**
   * Parameters for putApiV1SequencesKey
   */
  export interface PutApiV1SequencesKeyParams {
    key: string;
    body?: UpdateSequenceValueRequest;
  }
}

export { SequenceService }
