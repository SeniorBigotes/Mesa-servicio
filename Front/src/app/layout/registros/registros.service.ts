import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  api = environment.API_API

  // Botones (tickets, registros)
  private boton = new BehaviorSubject<string>('registros');
  boton$ = this.boton.asObservable();

  // busqueda del input
  private busquedaInput = new BehaviorSubject<string>("");
  busquedaInput$ = this.busquedaInput.asObservable();

  constructor(private http: HttpClient) { }

  // consultar todos los registros
  getRegistros(): Observable<any> {
    return this.http.get(`${this.api}/registros`);
  }

  // consultar registros por ID
  getRegistrosTicket(): Observable<any> {
    return this.http.get(`${this.api}/registros/ticket`);
  }

  // Generar registro sobre los tickets
  postRegistro(registro: any) : Observable<any> {
    const formato = {
      modifico: {id: registro.modifico},
      ticket: {id: registro.ticket},
      cambios: registro.cambios,
      prioridad: {id: registro.prioridad},
      estatus: registro.estatus,
      asignado: {id: registro.asignado}
    }
    return this.http.post(`${this.api}/registros`, formato);
  }

  // Subject de la busqueda
  busqueda(str: string) {
    this.busquedaInput.next(str)
  }

  botones(str: string) {
    this.boton.next(str);
  }
}
