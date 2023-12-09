import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../tickets.service';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/Ticket';
import { LoginService } from 'src/app/layout/login/login.service';
import { Cuenta } from 'src/app/models/Cuenta';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  usuario = this.loginService.getUser();

  tickets: Ticket[] = [];
  ticketsRespaldo: Ticket[] = [];

  spinner: boolean = true;
  hayTickets: boolean = true;
  
  error: any;
  
  fechaCreacion!: Date | string;
  fechaModificacion!: Date | string;
  
  vista: boolean = false;
  
  ticketSeleccionado: number | null = null;
  ticketBuscado: Ticket[] = [];
  selectSeleccionBusqueda!: string;

  filtroArea: string = 'all';
  filtroCategoria: string = 'all';
  filtroEstatus: string = 'all';

  constructor(private ticketsService: TicketsService,
              private loginService: LoginService,
              private router: Router) {}

  ngOnInit(): void {
    // vista del ticket 
    this.ticketsService.vistaSubject$.subscribe(vista => this.vista = vista);
    
    // Click ticket
    this.ticketsService.clickTicket$.subscribe(click => this.ticketSeleccionado = click);

    // Mostrar tickets
    this.loginService.getCurrentUser().subscribe(resp => this.llamarMostrarTicket(resp));
    
    // Actualiza los tickets
    this.ticketsService.ticketsActualizados$
        .subscribe(() => this.loginService.getCurrentUser()
            .subscribe(resp => this.llamarMostrarTicket(resp)));

    // resultados de busqueda
    this.ticketsService.busquedaTexto$.subscribe(texto => {
      this.tickets = this.ticketsRespaldo;
      if(texto !== '') {
        this.busquedaTickets(texto, this.selectSeleccionBusqueda);
        this.tickets = this.ticketBuscado;
      } else {
        this.tickets = this.ticketsRespaldo;
        this.hayTickets = true;
      }
    }); // end busqueda y filtros

    // Filtros
    this.ticketsService.selectSeleccionBusqueda$.subscribe(resp => this.selectSeleccionBusqueda = resp);
    this.ticketsService.filtroArea$.subscribe(resp => this.aplicarFiltro(resp, 'area'));
    this.ticketsService.filtroCategoria$.subscribe(resp => this.aplicarFiltro(resp, 'categoria'));
    this.ticketsService.filtroEstatus$.subscribe(resp => this.aplicarFiltro(resp, 'estatus'));
    
  } // end OnInit()

  // llamar a mostrarTickets()
  private llamarMostrarTicket(resp: Cuenta) {
    const seccionID: number = +resp?.seccion?.id;
    const usuarioID = +resp?.id;
    this.mostrarTickets(seccionID, usuarioID);
  }

  // mostrar tickets dependiendo la url
  private mostrarTickets(seccionID: number, usuarioID: number): void {
    if(seccionID === undefined || seccionID === null) {
      this.tickets = this.ticketsRespaldo;
    } else {
      // Sin asignar
      if(this.router.url === '/main/tickets/activos') {
        this.ticketsService.getTicketsNoAsigandos(seccionID)
            .subscribe(tickets => this.asignar(tickets));
      // Mis tickets activos y en proceso
      } else if(this.router.url === '/main/tickets/mis-tickets') {
        this.ticketsService.getMisTicketsActivos(seccionID, usuarioID)
            .subscribe(tickets => this.asignar(tickets));
      // Mis tickets finalizados
      } else if(this.router.url === '/main/tickets/finalizados') {
        this.ticketsService.getMisTicketsCerrados(seccionID, usuarioID)
            .subscribe(tickets => this.asignar(tickets));
      } else {
        this.ticketsRespaldo = this.tickets;
      }
    }
  }

  // Asignar tickets y fechas para mostrar
  private asignar(tickets: Ticket[]): void {
    this.spinner = false;
    this.hayTickets = false;
    this.tickets = tickets;
    this.ticketsRespaldo = tickets;
    
    if(tickets !== null) {
      this.hayTickets = true;
      tickets.forEach((ticket: Ticket) => {
        if(ticket !== null) {
          this.fechaCreacion = ticket.fechaCreacion;
          this.fechaModificacion = ticket.fechaModificacion;
        }
      });
    }
  }

  // Almacenar ticket (evento click)
  click(id: number): void {
    this.ticketsService.click(id);
    this.ticketsService.getTicketId(id).subscribe(ticket => {
      this.ticketsService.setTicket(ticket);
    });
  } // end evento click

  /* BUSQUEDA DE TICKETS */
  // principal
  private busquedaTickets(text: string, select?:string): void {
    if(this.tickets !== null) {
      // Sin asignar
      if(this.router.url === '/main/tickets/activos') {
        this.ticketBuscado = this.funcionBusqueda(text, this.selectSeleccionBusqueda);
      // Mis tickets
      } else if(this.router.url === '/main/tickets/mis-tickets') {
        this.ticketBuscado = this.funcionBusqueda(text, this.selectSeleccionBusqueda);
      // Mis tickets cerrados
      } else if (this.router.url === '/main/tickets/finalizados') {
        this.ticketBuscado = this.funcionBusqueda(text, this.selectSeleccionBusqueda);
      }
    }
  }
  /* FUNCIONES DE BUSQUEDA */
  // Busqueda de tickets (secundario)
  private funcionBusqueda(txt: string, select: string): Ticket[] {
    let busqueda: Ticket[];
    const texto = txt.toLowerCase()
    if(this.soloLetras(txt)) {
      if(select === 'autor') {
        busqueda = this.busquedaTicketAutor(txt);
      } else if(select === 'asignado') {
        busqueda = this.busquedaTicketAsignado(txt);
      } else {
        busqueda = this.tickets.filter(ticket => {
          return ticket.asunto.toLowerCase().includes(texto)
        });
      }
    } else {
      const ticketID: number = parseInt(txt);
      busqueda = this.tickets.filter(ticket => ticket.id === ticketID);
    }
    this.hayTickets = busqueda.length === 0 ? false : true;
    
    return busqueda;
  }
  // Por autor
  private busquedaTicketAutor(txt: string): Ticket[] | any {
    let busqueda;
    const texto = txt.toLowerCase()
    if(texto.includes(' ')) {
      const partes: string[] = texto.split(' ');
      const parte1: string = partes[0];
      const parte2: string = partes[1];
      busqueda = this.tickets.filter(ticket => {
        return (ticket.autor.perfil.nombre.toLowerCase().includes(parte1) &&
        ticket.autor.perfil.apellidoP.toLowerCase().includes(parte2)) || 
        (ticket.autor.perfil.nombre.toLowerCase().includes(parte2) &&
        ticket.autor.perfil.apellidoP.toLowerCase().includes(parte1));
      })
    } else {
      busqueda = this.tickets.filter(ticket => {
        return ticket.autor.perfil.nombre.toLowerCase().includes(texto) ||
        ticket.autor.perfil.apellidoP.toLowerCase().includes(texto);
      });
    }
    return busqueda;
  }
  // por asignado
  private busquedaTicketAsignado(txt: string): Ticket[] | any{
    let busqueda;
    const texto = txt.toLowerCase()
    if(texto.includes(' ')) {
      const partes: string[] = texto.split(' ');
      const parte1: string = partes[0];
      const parte2: string = partes[1];
      busqueda = this.tickets.filter(ticket => {
        return (ticket.asignado?.perfil.nombre.toLowerCase().includes(parte1) &&
        ticket.asignado?.perfil.apellidoP.toLowerCase().includes(parte2)) || 
        (ticket.asignado?.perfil.nombre.toLowerCase().includes(parte2) &&
        ticket.asignado?.perfil.apellidoP.toLowerCase().includes(parte1));
      })
    } else {
      busqueda = this.tickets.filter(ticket => {
        return ticket.asignado?.perfil.nombre.toLowerCase().includes(texto) ||
        ticket.asignado?.perfil.apellidoP.toLowerCase().includes(texto);
      });
    }
    return busqueda;
  }
  // Por area
  private filtrarArea(search: string, tickets: Ticket[]): Ticket[] | any{
    let buscar;
    if(tickets !== null) {
      buscar = tickets.filter(ticket => ticket.seccion.seccion.toLowerCase().includes(search));
    }
    if(search === 'all') buscar = this.ticketsRespaldo;
    return buscar;
  }
  private filtrarCategoria(search: string, tickets: Ticket[]): Ticket[] | any{
    let buscar; 
    if(tickets !== null) {
      buscar = tickets.filter(ticket => ticket.categoria.categoria.toLowerCase().includes(search));
    }
    if(search === 'all') buscar = this.ticketsRespaldo;
    return buscar;
  }
  private filtrarEstatus(search: string, tickets: Ticket[]): Ticket[] | any{
    let buscar;    
    if(tickets !== null) {
      buscar = tickets.filter(ticket => ticket.estatus.toLowerCase().includes(search));
    }
    if(search === 'all') buscar = this.ticketsRespaldo;
    return buscar;
  }
  // aplicar filtros
  private aplicarFiltro(resp: string, filtro: string) {
    const busqueda = resp.toLowerCase();
    this.tickets = this.ticketsRespaldo;
    this.hayTickets = true;
    if(this.tickets !== null) {
      if(filtro === 'area') {
        if(this.filtrarArea(busqueda, this.tickets).length === 0) this.hayTickets = false;
        this.tickets = this.filtrarArea(busqueda, this.tickets);
      } else if(filtro === 'categoria') {
        if(this.filtrarCategoria(busqueda, this.tickets).length === 0) this.hayTickets = false;
        this.tickets = this.filtrarCategoria(busqueda, this.tickets);
      } else if(filtro === 'estatus') {
        if(this.filtrarEstatus(busqueda, this.tickets).length === 0) this.hayTickets = false;
        this.tickets = this.filtrarEstatus(busqueda, this.tickets);
      }
    }
  }

  // Verificar si su buscan palabras o numeros
  private soloLetras(str: string): boolean {
    return /^[A-Za-z\s]+$/.test(str);
  }
}
