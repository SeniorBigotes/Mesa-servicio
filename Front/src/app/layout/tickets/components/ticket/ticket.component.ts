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
  vista: boolean = false;
  vistaLista: boolean = false;
  ticketSeleccionado: number | null = null;

  constructor(private ticketsService: TicketsService,
              private loginService: LoginService) {}

  ngOnInit(): void {
    //Obtener tickets
    this.ticketsService.getTickets().subscribe(resp => {
      this.tickets = resp;
      resp.forEach((tickets: any) => {
        this.fechaCreacion = tickets.fechaCreacion;
        this.fechaModificacion = tickets.fechaModificacion;
      })
    }, err => this.error = err)
  }

  lista() {
    this.vistaLista = true;
  }
  
  cuadros() {
    this.vistaLista = false;
  }

  // Almacenar ticket (evento click)
  click(id: number): void {
    this.ticketSeleccionado = id;
    this.ticketsService.getTicketId(id).subscribe(ticket => {
      this.ticketsService.setTicket(ticket);
    })
  }
}
