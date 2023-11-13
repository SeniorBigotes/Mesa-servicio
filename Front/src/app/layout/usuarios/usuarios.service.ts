import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Perfil } from './components/PerfilesInterface';

@Injectable({
  providedIn: 'root'
})
export class FormRegisterService {

  private apiAuth: string = environment.API_AUTH;

  private estatusSubject = new BehaviorSubject<any>(null);
  estatus$ = this.estatusSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Visualizar roles
  getRoles(): Observable<any> {
    return  this.http.get(`${this.apiAuth}/roles`);
  }

  // Visualizar usuarios
  getPerfil(): Observable<any> {
    return this.http.get(`${this.apiAuth}/perfiles`);
  }

  // Registrar usuario
  postUser(user: any): Observable<any> {
    return this.http.post(`${this.apiAuth}/register`, user);
  }

  // Actualizar estatus del usuario 
  putEstatus(estatus: object, id: number): Observable<any> {
    return this.http.put(`${this.apiAuth}/estatus/${id}`, estatus);
  }


  /* OBSERVABLES SERVICE */
  estatusS(perfil: Perfil) {
    this.estatusSubject.next(perfil);
  }
}
