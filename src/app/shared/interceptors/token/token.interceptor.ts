import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN_URLS } from '../../constants';
import { LocalStorageKey } from '../../enums';
import { LocalStorageService } from '../../services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAllowed = TOKEN_URLS.some((url: string): boolean => request.url.includes(url));
    const token: string = this.localStorage.getValue(LocalStorageKey.token);
    const identifier: string = this.localStorage.getValue(LocalStorageKey.userId);

    if (!isAllowed || !token || !identifier) {
      return next.handle(request);
    }

    request = request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${ token }`)
        .set('Identifier', identifier)
    });

    return next.handle(request);
  }
}
