import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../tickets.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {

  ticket: any = null;
  
  constructor(private ticketsService: TicketsService) {
  }
  
  ngOnInit(): void {
    this.ticketsService.ticketService$?.subscribe(ticket => {
      if(ticket !== null && ticket !== undefined) {
        this.ticket = ticket;
      }
    });
  }
}
