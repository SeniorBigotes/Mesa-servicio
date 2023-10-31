import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../tickets.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  tickets: any;
  error: any;
  fechaCreacion!: Date;
  fechaModificacion!: Date;
  // Fecha de creacion
  dc!: number;
  mc!: number;
  yc!: number;
  // Fecha de expiracion
  dm?: number;
  mm?: number;
  ym?: number;
  
  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.ticketsService.getTickets().subscribe(resp => {
      console.log(resp);
      this.tickets = resp;
      resp.forEach((tickets: any) => {
        this.fechaCreacion = tickets.fechaCreacion;
        this.fechaModificacion = tickets.fechaModificacion;
      })
      this.obtenerFecha(this.fechaCreacion, this.fechaModificacion);
    }, err => this.error = err)
  }

  private obtenerFecha(fc:Date, fm: Date): void {
    fc = new Date(this.fechaCreacion);
    fm = new Date(this.fechaModificacion);
    this.dc = fc.getDate();
    this.mc = fc.getMonth();
    this.yc = fc.getFullYear();
    this.dm = fc.getDate();
    this.mm = fc.getMonth();
    this.ym = fc.getFullYear();
  }
}
