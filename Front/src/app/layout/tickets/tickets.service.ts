import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from './components/TicketInterface';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  
  api: string = environment.API_API;

  constructor(private http: HttpClient) { }

  getTickets(): Observable<any> {
    return this.http.get(`${this.api}/tickets`);
  }

  postTickets(ticket: any): Observable<any> {
    return this.http.post(`${this.api}/tickets`, ticket, {withCredentials: true});
  }

  getSecciones(): Observable<any> {
    return this.http.get(`${this.api}/secciones`);
  }

  getCategorias(): Observable<any> {
    return this.http.get(`${this.api}/categorias`);
  }

  getPrioridad(): Observable<any> {
    return this.http.get(`${this.api}/prioridades`)
  }
}
