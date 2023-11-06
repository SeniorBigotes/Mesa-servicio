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

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    // vista del ticket 
    this.ticketsService.vistaSubject$.subscribe(vista => {
      this.vista = vista;
    })

    //Obtener tickets (principal)
    this.ticketsService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
      tickets.forEach((tickets: any) => {
        this.fechaCreacion = tickets.fechaCreacion;
        this.fechaModificacion = tickets.fechaModificacion;
      })
    }, err => this.error = err);
    
    //Escucha por los cambios
    this.ticketsService.ticketsActualizados$.subscribe(tickets => {
      this.tickets = tickets;
    })
  }

  // Almacenar ticket (evento click)
  click(id: number): void {
    this.ticketSeleccionado = id;
    this.ticketsService.getTicketId(id).subscribe(ticket => {
      this.ticketsService.setTicket(ticket);
    })
  }
}
