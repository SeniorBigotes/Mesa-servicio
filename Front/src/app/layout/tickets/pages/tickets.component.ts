import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../tickets.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  busquedaInput: string= "";
  tickets: any;

  // pasar al servie
  // mostrarlo en pantalla
  ticketBuscado = [];

  error: any;

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    // Obtener tickets
    this.ticketsService.getTickets().subscribe({
      next: tickets => this.tickets = tickets, 
      error: err => this.error = err
    });
  }
  
  /* VISTA DE TICKETS */
  lista() {
    this.ticketsService.vistaLista();
  }
  cuadros() {
    this.ticketsService.vistaCuadros();
  }
  
  /* BUSQUEDA DE TICKETS */
  busqueda() {
    if(this.soloLetras(this.busquedaInput)) {
      this.ticketBuscado = this.tickets.filter((ticket: any) => 
          ticket.asunto.toLowerCase().includes(this.busquedaInput.toLowerCase()));
    } else {
      const busqueda = parseInt(this.busquedaInput, 10);
      this.ticketBuscado = this.tickets.filter((ticket: any) => ticket.id === busqueda);
    }
    this.ticketsService.buscarTickets(this.ticketBuscado);
    this.ticketsService.textoBuscado(this.busquedaInput);
  }

  // Filtrar letras de numeros
  private soloLetras(str: string): boolean {
    return /^[A-Za-z\s]+$/.test(str);
  }

}
