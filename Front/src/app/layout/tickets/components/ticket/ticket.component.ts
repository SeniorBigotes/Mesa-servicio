import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../tickets.service';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/Ticket';
import { LoginService } from 'src/app/layout/login/login.service';
import { Cuenta } from 'src/app/models/Cuenta';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  usuario = this.loginService.getUser();

  tickets: Ticket[] = [];
  ticketsRespaldo: Ticket[] = [];
  
  error: any;
  
  fechaCreacion!: Date | string;
  fechaModificacion!: Date | string;
  
  vista: boolean = false;
  
  ticketSeleccionado: number | null = null;
  ticketBuscado!: Ticket[];

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
        .subscribe(tickets => this.loginService.getCurrentUser()
            .subscribe(resp => this.llamarMostrarTicket(resp)));

    // resultados de busqueda
    this.ticketsService.busquedaTexto$.subscribe(texto => {
      this.tickets = this.ticketsRespaldo;
      if(texto !== '') {
        this.busquedaTickets(texto);
        this.tickets = this.ticketBuscado;
      } else {
        this.tickets = this.ticketsRespaldo;
      }
    }); // end busqueda y filtros
  } // end OnInit()

  // Almacenar ticket (evento click)
  click(id: number): void {
    this.ticketsService.click(id);
    this.ticketsService.getTicketId(id).subscribe(ticket => {
      this.ticketsService.setTicket(ticket);
    });
  } // end evento click

  private busquedaTickets(text: string): void {
    // Sin asignar
    if(this.router.url === '/main/tickets/activos') {
      this.ticketBuscado = this.funcionBusqueda(text);
    // Mis tickets
    } else if(this.router.url === '/main/tickets/mis-tickets') {
      this.ticketBuscado = this.funcionBusqueda(text);
    // Mis tickets cerrados
    } else if (this.router.url === '/main/tickets/finalizados') {
      this.ticketBuscado = this.funcionBusqueda(text);
    }
  }

  // Filtro para busqueda de tickets
  private funcionBusqueda(txt: string): Ticket[] {
    let busqueda: Ticket[];
    if(this.soloLetras(txt)) {
      busqueda = this.tickets.filter(ticket => {
        return ticket.asunto.toLowerCase().includes(txt.toLowerCase()) ||
        ticket.autor.perfil.nombre.toLowerCase().includes(txt.toLowerCase());
      });
    } else {
      busqueda = this.tickets.filter(ticket => {
        const busqueda: number = parseInt(txt);
        return ticket.id === busqueda;
      });
    }
    return busqueda;
  }

  // Asignar tickets y fechas
  private asignar(tickets: Ticket[]): void {    
    this.tickets = tickets;
    this.ticketsRespaldo = tickets;
    if(tickets !== null) {
      tickets.forEach((ticket: Ticket) => {
          this.fechaCreacion = ticket.fechaCreacion;
          this.fechaModificacion = ticket.fechaModificacion;
      });
    }
  }

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

  // Verificar si su buscan palabras o numeros
  private soloLetras(str: string): boolean {
    return /^[A-Za-z\s]+$/.test(str);
  }
}
