import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios.service';
import { LoginRequest } from './components/loginInterface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token: string = "";

  private API_REGISTER = "http://localhost:8080/auth/register";
  private API_LOGIN = "http://localhost:8080/auth/login";
  private API_PAGE = "http://localhost:8080/user/demo";

  constructor(private httpClient: HttpClient
              ) {}

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  // Solicitar el inicio de sesion
  postLogin(sesion: LoginRequest): Observable<any> {
    return this.httpClient.post(this.API_LOGIN, sesion);
  }

  // Acceso a los datos protegidos
  postPage(token: string): Observable<any> {
    return this.httpClient.post(this.API_PAGE, token);
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.log(`Se ha producido un error: ${error.error}`);
    } else {
      console.error(`Codigo de estado ${error.status}:\n${error.error}`);
    }
    return throwError(() => new Error("Algo fallo, intentelo nuevamente"));
  }
}
