import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private api: string = environment.API_API;
  private auth: string = environment.API_AUTH;

  // Click al ticket
  private clickTiket = new BehaviorSubject<number>(0);
  clickTicket$ = this.clickTiket.asObservable();

  // Vista de tickets (lista o cuadriculado)
  private vista = new BehaviorSubject<any>(false);
  vistaSubject$ = this.vista.asObservable();
  
  // Actualizar tickets (cambios)
  private ticketsSubject = new BehaviorSubject<any>(null);
  ticketsActualizados$ = this.ticketsSubject.asObservable();
  private ticket = new BehaviorSubject<any>(null);
  ticketService$ = this.ticket.asObservable();

  // Busqueda de tickets (barra de busqueda)
  private ticketBuscadoSubject = new BehaviorSubject([]);
  ticketBuscado$ = this.ticketBuscadoSubject.asObservable();
  private busquedaTexto = new BehaviorSubject('');
  busquedaTexto$ = this.busquedaTexto.asObservable();

  // Filtros
  private selectSeleccionBusqueda = new BehaviorSubject<string>('ticket');
  selectSeleccionBusqueda$ = this.selectSeleccionBusqueda.asObservable();
  
  private filtroArea = new BehaviorSubject<string>('all');
  filtroArea$ = this.filtroArea.asObservable();
  
  private filtroCategoria = new BehaviorSubject<string>('all');
  filtroCategoria$ = this.filtroCategoria.asObservable();
  
  private filtroEstatus = new BehaviorSubject<string>('all');
  filtroEstatus$ = this.filtroEstatus.asObservable();

  // CONSTRUCTOR
  constructor(private http: HttpClient) { }

  /* OBATENER TICKTES */
  // consultar todos los tickets
  getTickets(): Observable<any> {
    return this.http.get(`${this.api}/tickets`);
  }
  // consultar tickets no asigandos
  getTicketsNoAsigandos(id: number): Observable<any> {
      return this.http.get(`${this.api}/tickets/no_asignados/${id}`);
  }
  // consultar mis tickets activos y en proceso
  getMisTicketsActivos(seccilonID: number, usuarioID: number): Observable<any> {
    return this.http.get(`${this.api}/tickets/mis_tickets/${seccilonID}/${usuarioID}`);
  }
  // consultar mis tickets cerrados
  getMisTicketsCerrados(seccilonID: number, usuarioID: number): Observable<any> {
    return this.http.get(`${this.api}/tickets/cerrados/${seccilonID}/${usuarioID}`);
  }

  // Actualiza tickets tiempo real
  actualizarTickets(tickets: any) {
    this.ticketsSubject.next(tickets);
  }

    /* Obtener tickets (escuchar por los cambios) */
  setTicket(ticket: any) {
    this.ticket.next(ticket);
  }

  getTicketId(id: number): Observable<any> {
    return this.http.get(`${this.api}/tickets/${id}`);
  }

  // Crear tickets
  postTickets(ticket: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Acces-Control-Allow-Origin', '*');

    return this.http.post(`${this.api}/tickets`, ticket, {
      withCredentials: true,
      headers: headers
    });
  }
  // Actualizar ticket
  putTicket(ticket: any, id: number): Observable<any> {
    return this.http.put(`${this.api}/tickets/${id}`, ticket, {
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
    return this.http.get(`${this.api}/prioridades`);
  }

  getAsignados(id: number): Observable<any> {
    return this.http.get(`${this.auth}/asignados/${id}`);
  }

  /* VISTA DE TICKETS */
  vistaLista() {
    this.vista.next(true);
  }
  
  vistaCuadros() {
    this.vista.next(false);
  }

  /* Obtener tickets buscados */
  buscarTickets(response: any) {
    this.ticketBuscadoSubject.next(response);
  }
  textoBuscado(texto: string) {
    this.busquedaTexto.next(texto);
  }

  // Click al ticket
  click(str: number): void {
    this.clickTiket.next(str);
  }

  // cambios en los filtros (select)
  seleccion(str: string): void {
    this.selectSeleccionBusqueda.next(str);
  }
  area(str: string) {
    this.filtroArea.next(str);
  }
  categoria(str: string): void {
    this.filtroCategoria.next(str);
  }
  estatus(str: string): void {
    this.filtroEstatus.next(str);
  }
}
