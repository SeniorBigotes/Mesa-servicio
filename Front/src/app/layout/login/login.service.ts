import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_CUENTAS = "http://localhost:8080/api/cuentas";

  constructor(private httpClient: HttpClient,
              private serviciosApp: ServiciosService
              ) { }

  // Obtiene todos los usuarios y contraseñas
  getAllCuentas(): Observable<any> {
    return this.httpClient.get(this.API_CUENTAS);
  }

  // Valida el inicio de sesion
  login(front: any, back:any): boolean {
    let userback = 0;
    let passBack = 0;
    
    // iterar sobre el backend
    for(let array of back) {
      for(let element of array) {
        userback = element.nombreUsuario;
        passBack = element.contraseña;
        // validar
        if(front.user === userback && front.pass === passBack) {
          this.serviciosApp.route.navigate(['/main']);
          this.serviciosApp.setViewPage(true);
          return true;
        }
      }
    }
    this.serviciosApp.setViewPage(false);
    return false;
  }
}
