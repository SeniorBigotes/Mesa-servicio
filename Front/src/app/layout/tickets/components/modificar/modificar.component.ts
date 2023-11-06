import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../tickets.service';
import { FormBuilder, FormGroup, FormControl , Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {

  ticket: any = null;
  ticketID: number = 0;
  modificarTicket!: FormGroup;
  prioridades!: any;
  estatus!: any;
  error: any = null
  alerta: boolean = false;
  
  constructor(private ticketsService: TicketsService,
              private fb: FormBuilder) {
  }
  
  ngOnInit(): void {
    this.modificarTicket = this.formulario();
    // escuchar cambios y actualizar
    this.ticketsService.ticketService$?.subscribe(ticket => {
      if(ticket !== null && ticket !== undefined) {
        this.ticket = ticket;
        this.ticketID = ticket.id;
        this.modificarTicket.patchValue({
          prioridad: ticket.prioridad.id,
          estatus: ticket.estatus,
          descripcionCambios: ticket.descripcionCambios
        })
      }
    });

    this.ticketsService.getPrioridad().subscribe(resp => {
      this.prioridades = resp;
    })
  } // end OnInit

  get getPrioridad() {return this.modificarTicket.get('prioridad') as FormControl;}
  get getEstatus() {return this.modificarTicket.get('estatus') as FormControl;}
  get getDescripcion() {return this.modificarTicket.get('descripcionCambios') as FormControl;}

  // Por arreglar, envia todo null
  modificar() {
    if(!this.modificarTicket.invalid) { // if
      const ticketModificado = {
        prioridad: {id: this.getPrioridad.value},
        estatus: this.getEstatus.value,
        descripcionCambios: this.getDescripcion.value
      }
      // actualizar tickets
      this.ticketsService.putTicket(ticketModificado, this.ticketID). subscribe(resp => {
        this.ticketsService.getTickets().subscribe(tickets => this.ticketsService.actualizarTickets(tickets), err => this.error = err);
      }, err => console.log(err));
      
    } else { // else
      this.alerta = true;
      setTimeout(() => {
        this.alerta = false;
      }, 2000);
    }
  }

  // Crear formulario para modificar tickets
  // Solucionar problema (no carga formulario hasta recargar la página)
  private formulario(): FormGroup {
    return this.fb.group({
      prioridad: ['', Validators.required],
      estatus: ['', Validators.required],
      descripcionCambios: ['', Validators.required]
    })
  }
}
