import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable()
export class TicketsInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = request;
    const token = this.loginService.getToken();

    // Inserta el token de autorizacion
    if(token !== null) {
      authRequest = authRequest.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(authRequest);
  }
}

export const ticketsInterceptor = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TicketsInterceptor,
    multi: true
  }
]