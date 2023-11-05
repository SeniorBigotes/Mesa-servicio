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
  modificarTicket!: FormGroup;
  
  constructor(private ticketsService: TicketsService,
              private fb: FormBuilder) {
  }
  
  ngOnInit(): void {
    this.modificarTicket = this.formulario();
    this.ticketsService.ticketService$?.subscribe(ticket => {
      if(ticket !== null && ticket !== undefined) {
        this.ticket = ticket;
      }
    });
  }

  // POr arreglar, envia todo null
  modificar() {
    console.log(this.modificarTicket.value);
  }

  // Crear formulario para modificar tickets
  // Solucionar problema (no carga formulario hasta recargar la página)
  private formulario(): FormGroup {
    return this.fb.group({
      prioridad: [this.ticket?.prioridad?.id, Validators.required],
      estatus: [this.ticket?.estatus, Validators.required],
      descripcionCambios: [this.ticket?.descripcionCambios, Validators.required]
    })
 }
}
