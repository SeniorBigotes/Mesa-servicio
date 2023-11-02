import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormRegisterService {

  rolesUrl: string = environment.API_AUTH;

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any> {
    return  this.http.get(`${this.rolesUrl}/roles`);
  }
}
