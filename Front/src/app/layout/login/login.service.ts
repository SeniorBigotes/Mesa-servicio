import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios.service';
import { LoginRequest } from '../../models/loginInterface';
import { environment } from 'src/environments/environment';
import { FormRegisterService } from '../usuarios/usuarios.service';
import { Perfil } from 'src/app/models/Perfil';
import { Cuenta } from 'src/app/models/Cuenta';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiAuth = environment.API_AUTH;
  private user = environment.API_USERS;

  authority: string = "";
  estatus!: string;

  constructor(private httpClient: HttpClient,
              private usuarioService: FormRegisterService) {}

  
  /* INICIO DE SESION */
  // solicitar datos
  postLogin(sesion: LoginRequest): Observable<any> {
    return this.httpClient.post(`${this.apiAuth}/login`, sesion)
  }
  // almacenar token
  loginUser(token: string) {
    localStorage.setItem('token', token)
  }
  // verificar login
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    if(token === undefined || token === null || token.length === 0) {
      return false;
    }
    return true;
  }
  // obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  // almacenar usuario
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  // obtener usuario
  getUser(): any {
    const user = localStorage.getItem('user');


    if(user === null) {
      this.logOut();
      return null;
    }

    return JSON.parse(user)
  }
  // obtener el usuario actual en la sesion
  getCurrentUser(): Observable<any> {
    return this.httpClient.get(`${this.user}/user-logged`)
  }
  // obtener rol del usuario
  getUserRol(): any {
    const user = this.getUser();
    return user.authority;
  }
  // cerrar sesion
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('url');
    return true;
  }
  // Obtener el estatus del usuario
  getEstatus(): string {
    const usuario = this.getUser();
    this.usuarioService.getPerfil().subscribe({
      next: (resp: Perfil[]) => resp.forEach((resp: Perfil) => {
        if(resp.id === usuario.id) this.estatus = resp.estatus;
      })
    }); return this.estatus;
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
