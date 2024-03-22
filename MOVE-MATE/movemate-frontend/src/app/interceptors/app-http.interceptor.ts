import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/auth/local-storage.service';
import { JwtHandlerService } from '../services/auth/jwt-handler.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(
    private jwtService:JwtHandlerService,
    private authStorageService:LocalStorageService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.authStorageService.get("movemate-token") ?? '';
    this.jwtService.setToken(token);


    if (token) {
      if(this.jwtService.isTokenExpired()) {
        this.authStorageService.remove("movemate-token");
        return next.handle(request);
      }

      const clonedReq = request.clone({
          headers: request.headers
                .set("Authorization", "Bearer " + token)
      });

      return next.handle(clonedReq);
    } else {
        return next.handle(request);
    }

  }
}
