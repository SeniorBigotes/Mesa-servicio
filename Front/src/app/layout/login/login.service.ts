import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string = "";

  private API_REGISTER = "http://localhost:8080/auth/register";
  private API_LOGIN = "http://localhost:8080/auth/login";
  private API_PAGE = "http://localhost:8080/user/demo";

  constructor(private httpClient: HttpClient,
              private serviciosApp: ServiciosService
              ) {

    // agregar almacenamiento local para conservar el token
    console.log(this.token)
    localStorage.setItem('token', this.getToken)
              }

  setToken(token: string) {
    this.token = token;
  }

  get getToken(): string {
    return this.token;
  }

  // Solicitar el inicio de sesion
  postLogin(sesion: any): Observable<any> {
    return this.httpClient.post(this.API_LOGIN, sesion);
  }

  // Acceso a los datos protegidos
  postPage(token: string): Observable<any> {
    return this.httpClient.post(this.API_PAGE, token);
  }
}
