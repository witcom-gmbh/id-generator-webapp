import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _config: any = {};

  constructor(private http: HttpClient) { }

  get data(): any {
    return this._config ? { ...this._config } : {};
  }

  loadAppConfig(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');


    return this.http.get(`/_ngx-rtconfig.json?cb=${new Date().getTime()}`, { headers }).pipe(data =>{
      return data;


    });



    /*
    return this.http.get(`/_ngx-rtconfig.json?cb=${new Date().getTime()}`, { headers }).pipe(
      map(data => {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            this._config[key.replace('NGX_', '').toLowerCase().split('_').map((el, i) => (i > 0 ? el.charAt(0).toUpperCase() + el.slice(1) : el)).join('')] = data[key];
          }
        }
        return this.data;
      })
    );
    */
  }


}
