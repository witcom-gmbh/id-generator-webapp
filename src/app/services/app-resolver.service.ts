import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CanActivate, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppResolverService implements CanActivate{

  constructor(private config: ConfigService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
/*
    return this.config.loadAppConfig().pipe(
      map(() => true),
      catchError(() => EMPTY)
    );
*/
      return true;
  }
}
