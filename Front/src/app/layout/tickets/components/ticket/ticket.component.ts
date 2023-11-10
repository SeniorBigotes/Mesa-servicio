import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../tickets.service';
import { DatePipe } from '@angular/common';
import { LoginService } from 'src/app/layout/login/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  tickets: any;
  error: any;
  fechaCreacion!: Date | string;
  fechaModificacion!: Date | string;
  ticketSeleccionado: number | null = null;
  vista: boolean = false;
  ticketBuscado: any = [];
  textoBusqueda: string = "";
  ticketsRespaldo!: any;


  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    // vista del ticket 
    this.ticketsService.vistaSubject$.subscribe(vista => {
      this.vista = vista;
    });

    //Obtener tickets (principal)
    this.ticketsService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
      this.ticketsRespaldo = tickets;
      
      tickets.forEach((tickets: any) => {
        this.fechaCreacion = tickets.fechaCreacion;
        this.fechaModificacion = tickets.fechaModificacion;
      });
    }, err => this.error = err);
    
    // Actualiza los tickets
    this.ticketsService.ticketsActualizados$.subscribe(tickets => {
      this.tickets = tickets;
    });

    // Busqueda de tickets 
    this.ticketsService.ticketBuscado$.subscribe(resp => {
      this.ticketBuscado = resp;
    });
    this.ticketsService.busquedaTexto$.subscribe(texto => {
      this.textoBusqueda = texto;
      
      if(this.textoBusqueda !== '') {
        this.tickets = this.ticketBuscado;
      } else {
        this.tickets = this.ticketsRespaldo;
      }
    });
  } // end OnInit()

  // Almacenar ticket (evento click)
  click(id: number): void {
    this.ticketSeleccionado = id;
    this.ticketsService.getTicketId(id).subscribe(ticket => {
      this.ticketsService.setTicket(ticket);
    })
  }
}
