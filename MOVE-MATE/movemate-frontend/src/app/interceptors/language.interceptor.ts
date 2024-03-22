import { LocalStorageService } from 'src/app/services/auth/local-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(private localStorageService:LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const lang = this.localStorageService.get("lang");
    request = request.clone({
      setHeaders:{
        'Accept-Language':lang || "fr"
      }
    })
    return next.handle(request);
  }
}
