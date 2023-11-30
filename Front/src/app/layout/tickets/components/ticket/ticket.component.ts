import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../tickets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  tickets: any;
  ticketsRespaldo!: any;
  
  ticketsActivos!: any;
  ticketsFinalizados!: any;

  error: any;
  
  fechaCreacion!: Date | string;
  fechaModificacion!: Date | string;
  
  vista: boolean = false;
  
  ticketSeleccionado: number | null = null;
  ticketBuscado: any = [];
  textoBusqueda: string = "";


  constructor(private ticketsService: TicketsService,
              private router: Router) {}

  ngOnInit(): void {
    // vista del ticket 
    this.ticketsService.vistaSubject$.subscribe(vista => {
      this.vista = vista;
    }); // end vista ticket

    // Click ticket
    this.ticketsService.clickTicket$.subscribe(click => this.ticketSeleccionado = click);
    //Obtener tickets (principal)
    this.ticketsService.getTickets().subscribe({
      next: tickets => {
      // Mostrar Activos / Finalizados
      if (this.router.url === '/main/tickets/finalizados') { // Finalizados
        this.tickets = this.filtrosFinalizados(this.tickets, tickets);
        this.ticketsFinalizados = this.tickets;
      } else if(this.router.url === '/main/tickets/activos') {
        this.tickets = this.filtrosActivos(this.tickets, tickets);
        this.ticketsActivos = this.tickets
      }
      this.ticketsRespaldo = this.tickets;
      
      tickets.forEach((tickets: any) => {
        this.fechaCreacion = tickets.fechaCreacion;
        this.fechaModificacion = tickets.fechaModificacion;
      });
    }, error: err => this.error = err}); // end obtener tickets 
    
    // Actualiza los tickets
    this.ticketsService.ticketsActualizados$.subscribe(tickets => {
      if(this.router.url === '/main/tickets/finalizados') { // Finalizados
        this.tickets = this.filtrosFinalizados(this.tickets, tickets);
      } else if(this.router.url === '/main/tickets/activos') { // Activos
        this.tickets = this.filtrosActivos(this.tickets, tickets);
      }
    }); // end actualizar tickets

    // Busqueda de tickets
    this.ticketsService.ticketBuscado$.subscribe(resp => {
      if(this.router.url === '/main/tickets/finalizados') { // Finalizados
        this.ticketBuscado = this.filtrosFinalizados(this.tickets, resp);
      } else if(this.router.url === '/main/tickets/activos') { // Activos
        this.ticketBuscado = this.filtrosActivos(this.tickets, resp);
      }
    });
    // resultados de busqueda
    this.ticketsService.busquedaTexto$.subscribe(texto => {
      this.textoBusqueda = texto;
      
      if(this.textoBusqueda !== '') {
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

  /* FILTROS PARA LA BUSQUEDA DE TICKETS */
  // Tickets activos
  private filtrosActivos(vari: any, param: any): any {
    vari = param?.filter((f: any) => {
      const estatus = f.estatus.toLowerCase()
      return estatus.includes('abierto') ||
      estatus.includes('en_proceso');
    });
    return vari;
  }
  // Tickets finalizados
  private filtrosFinalizados(vari: any, param: any): any {
    vari = param?.filter((f: any) => {
      const estatus = f.estatus.toLowerCase();
      return estatus.includes('cerrado');
    });
    return vari;
  } // end filtros
}
