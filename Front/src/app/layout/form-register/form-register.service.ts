import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormRegisterService {

  private apiAuth: string = environment.API_AUTH;


  constructor(private http: HttpClient) { }

  // Visualizar roles
  getRoles(): Observable<any> {
    return  this.http.get(`${this.apiAuth}/roles`);
  }

  // Registrar usuario
  postUser(user: any): Observable<any> {
    return this.http.post(`${this.apiAuth}/register`, user);
  }
}
