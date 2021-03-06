import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const reqUrl = 'https://localhost:44316/';

    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + sessionStorage.getItem('token')
      ),
      url: reqUrl + '' + req.url
    });
    return next.handle(req);
  }
}
