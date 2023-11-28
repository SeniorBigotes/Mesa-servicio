import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  api = environment.API_API

  constructor(private http: HttpClient) { }

  getRegistros(): Observable<any> {
    return this.http.get(`${this.api}/reportes`);
  }

  // Generar registro sobre los tickets
  postRegistro(registro: any) : Observable<any> {
    const formato = {
      modifico: {id: registro.modifico},
      ticket: {id: registro.ticket},
      cambios: registro.cambios,
      prioridad: {id: registro.prioridad},
      estatus: registro.estatus
    }

    return this.http.post(`${this.api}/reportes`, formato);
  }
}
