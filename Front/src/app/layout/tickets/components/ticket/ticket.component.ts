import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../tickets.service';
import { DatePipe } from '@angular/common';

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

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
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
    console.log(this.vistaLista)
  }
  
  cuadros() {
    this.vistaLista = false;
    console.log(this.vistaLista)

  }
}
