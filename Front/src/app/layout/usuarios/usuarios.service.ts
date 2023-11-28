import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormRegisterService {

  private apiAuth: string = environment.API_AUTH;

  // Estatus del usuario
  private estatusSubject = new BehaviorSubject<any>(null);
  estatus$ = this.estatusSubject.asObservable();

  // Modificar cambios
  private modificarUsuario = new BehaviorSubject<any>(null);
  modificarUsuario$ = this.modificarUsuario.asObservable();
  // usuarios ya modificados
  private usuariosModificados = new BehaviorSubject<any>(null);
  usuariosModificados$ = this.usuariosModificados.asObservable();

  constructor(private http: HttpClient) {}

  // Visualizar roles
  getRoles(): Observable<any> {
    return  this.http.get(`${this.apiAuth}/roles`);
  }

  // Visualizar perfiles de usuarios
  getPerfil(): Observable<any> {
    return this.http.get(`${this.apiAuth}/perfiles`);
  }

  // Visualizar cuentas de usuarios
  getCuenta(): Observable<any> {
    return this.http.get(`${this.apiAuth}/cuentas`);
  }

  // Visualizar cuentas de usuarios por ID
  getCuentaId(id: number): Observable<any> {
    return this.http.get(`${this.apiAuth}/cuentas/${id}`);
  }

  // Registrar usuario
  postUser(user: any): Observable<any> {
    return this.http.post(`${this.apiAuth}/register`, user);
  }

  // Actualizar estatus del usuario 
  putEstatus(estatus: object, id: number): Observable<any> {
    return this.http.put(`${this.apiAuth}/estatus/${id}`, estatus);
  }

  // Actualizar usuario (perfil y cuenta)
  putUsuario(usuario: any, id: number): Observable<any> {
    return this.http.put(`${this.apiAuth}/register/${id}`, usuario);
  }

  /* OBSERVABLES SERVICE */
  // Cambio de estatus
  estatusS(cuenta: any) {
    this.estatusSubject.next(cuenta);
  }

  // actualizar usuario
  updateUser(cuenta: any) {
    this.modificarUsuario.next(cuenta);
  }

  // Usuarios actualizados
  updatedUsers(cuentas: any) {
    this.usuariosModificados.next(cuentas);
  }
}
