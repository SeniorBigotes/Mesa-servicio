import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from './components/TicketInterface';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  
  private api: string = environment.API_API;

  private ticket = new BehaviorSubject<any>(null);
  ticketService$ = this.ticket.asObservable();

  constructor(private http: HttpClient) { }

  getTickets(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Acces-Control-Allow-Origin', '*');

    return this.http.get(`${this.api}/tickets`, {withCredentials: true, headers: headers});
  }

  getTicketId(id: number): Observable<any> {
    return this.http.get(`${this.api}/tickets/${id}`)
  }

  postTickets(ticket: any): Observable<any> {
    return this.http.post(`${this.api}/tickets`, ticket, {
      withCredentials: true
    });
  }

  /* Para el formulario de creacion de tickets */
  getSecciones(): Observable<any> {
    return this.http.get(`${this.api}/secciones`);
  }

  getCategorias(): Observable<any> {
    return this.http.get(`${this.api}/categorias`);
  }

  getPrioridad(): Observable<any> {
    return this.http.get(`${this.api}/prioridades`)
  }

  /* Obtener tickets */
  setTicket(ticket: any) {
    this.ticket.next(ticket);
  }
}
