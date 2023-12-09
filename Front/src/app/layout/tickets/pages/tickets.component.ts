import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../tickets.service';
import { FormsModule } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { Seccion } from 'src/app/models/Seccion';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from 'src/app/models/Ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  busquedaInput: string= "";
  tickets!: Ticket[];
  ticketsRespaldo!: Ticket[];


  categorias!: Categoria[];
  secciones!: Seccion[];

  selectFiltro: string = 'ticket';
  selectArea: string = 'all';
  selectCategoria: string = 'all';
  selectEstatus: string = 'all';

  // pasar al servie
  // mostrarlo en pantalla
  ticketBuscado: Ticket[] = [];

  error: any;

  url: string = this.router.url;

  constructor(private ticketsService: TicketsService,
              private router: Router) {}

  ngOnInit(): void {
    // Obtener tickets
    this.ticketsService.getTickets().subscribe({
      next: tickets => this.tickets = tickets, 
      error: err => this.error = err
    });
    
    this.ticketsService.getCategorias().subscribe(resp => this.categorias = resp);
    this.ticketsService.getSecciones().subscribe(resp => this.secciones = resp);
  }

  // direccion url
  ticketsUrl(): void {
    if(this.url !== this.router.url) {
      this.resetSelectFiltros();
      this.url = this.router.url;
    }
  }
  // resetar valores de los select (filtros)
  resetSelectFiltros() {
    this.selectFiltro = 'ticket';
    this.selectArea = 'all';
    this.selectCategoria = 'all';
    this.selectEstatus = 'all'
    this.ticketsService.seleccion('ticket');
    this.ticketsService.area('all');
    this.ticketsService.categoria('all');
    this.ticketsService.estatus('all');
    this.busquedaInput = '';
    this.ticketsService.textoBuscado('');
  }
  
  /* VISTA DE TICKETS */
  lista() {
    this.ticketsService.vistaLista();
  }
  cuadros() {
    this.ticketsService.vistaCuadros();
  }
  
  /* BUSQUEDA DE TICKETS */
  // input
  busqueda() {
    if(this.soloLetras(this.busquedaInput)) {
      this.ticketBuscado = this.tickets.filter((ticket: Ticket) => 
          ticket.asunto.toLowerCase().includes(this.busquedaInput.toLowerCase()));
    } else {
      const busqueda = parseInt(this.busquedaInput, 10);
      this.ticketBuscado = this.tickets.filter((ticket: any) => ticket.id === busqueda);
    }
    this.ticketsService.buscarTickets(this.ticketBuscado);
    this.ticketsService.textoBuscado(this.busquedaInput);
  }

  // filtros
  selectTicket(event: any): void {
    const filtro = event.target.id;
    
    if(filtro === 'filtro') this.ticketsService.seleccion(this.selectFiltro);
    if(filtro === 'areas') this.ticketsService.area(this.selectArea);
    if(filtro === 'categorias') this.ticketsService.categoria(this.selectCategoria);
    if(filtro === 'estatus') this.ticketsService.estatus(this.selectEstatus);
  }

  // Filtrar letras de numeros
  private soloLetras(str: string): boolean {
    return /^[A-Za-z\s]+$/.test(str);
  }
}
