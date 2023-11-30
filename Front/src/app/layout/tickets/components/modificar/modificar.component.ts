import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../tickets.service';
import { FormBuilder, FormGroup, FormControl , Validators } from '@angular/forms';
import { LoginService } from 'src/app/layout/login/login.service';
import { Ticket } from 'src/app/models/Ticket';
import { RegistrosService } from 'src/app/layout/registros/registros.service';

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

  asignar?: any;
  seccionID!: number;

  authority: string = this.loginService.getUserRol();
  
  constructor(private ticketsService: TicketsService,
              private loginService: LoginService,
              private registrosService: RegistrosService,
              private fb: FormBuilder) {
  }
  
  ngOnInit(): void {
    this.modificarTicket = this.formulario();
    // escuchar cambios y actualizar
    this.ticketsService.ticketService$?.subscribe(ticket => {      
      if(ticket !== null && ticket !== undefined) {
        this.ticket = ticket;
        this.ticketID = ticket.id;
        this.seccionID = ticket.seccion.id
        this.modificarFormulario(ticket);
        this.ticketsService.getAsignados(this.seccionID).subscribe(resp => this.asignar = resp);
      }
    });

    // obtener prioridades
    this.ticketsService.getPrioridad().subscribe(resp => this.prioridades = resp)    
  } // end OnInit

  get getPrioridad() {return this.modificarTicket.get('prioridad') as FormControl;}
  get getEstatus() {return this.modificarTicket.get('estatus') as FormControl;}
  get getDescripcion() {return this.modificarTicket.get('descripcionCambios') as FormControl;}
  get getAsignado() {return this.modificarTicket.get('asignado') as FormControl;}

  modificar() {
    if(this.authority !== 'BECARIO') {
      if(!this.modificarTicket.invalid) {
        const ticketModificado = {
          prioridad: {id: this.getPrioridad.value},
          estatus: this.getEstatus.value,
          descripcionCambios: this.getDescripcion.value,
          asignado: {id: this.getAsignado.value}
        }
        // actualizar tickets
        this.enviar(ticketModificado);
      } else {
        this.alert();
      }
    } else {
      if(this.getDescripcion.value !== '') {
        const ticketModificado = { descripcionCambios: this.getDescripcion.value }
        this.enviar(ticketModificado);
      } else {
        this.alert();
      }
    }
  }// end modificar

  clear() {
    this.modificarTicket.reset();
    this.ticket = null;
    this.ticketsService.click(0);
  }

  private enviar(ticket: any): void {
    this.ticketsService.putTicket(ticket, this.ticketID).subscribe({
      next: resp => {
        // generar reporte
        const usuario = this.loginService.getUser();
        this.registrosService.postRegistro(this.registro(usuario, resp))
            .subscribe();
      },error: err => this.error = err,
      complete: () => {
        // obtener tickets actualizados
        this.extraerTickets();    
        this.ticket = null;
        this.modificarTicket.reset();
        this.ticketsService.click(0);
      }});
  }

  // Alerta
  private alert(): void {
    this.alerta = true;
    setTimeout(() => this.alerta = false, 2000);
  }

  // Envia datos actualizados
  private extraerTickets(): void {
    this.ticketsService.getTickets().subscribe({
      next: tickets => this.ticketsService.actualizarTickets(tickets), 
      error: err => this.error = err
    });
  }

  // Crear formulario para modificar tickets
  private formulario(): FormGroup {
    return this.fb.group({
      prioridad: ['', Validators.required],
      estatus: ['', Validators.required],
      descripcionCambios: ['', Validators.required],
      asignado: ['', Validators.required]
    });
  }

  // Formulario de modificar
  private modificarFormulario(ticket: any): void {
    this.modificarTicket.patchValue({
      prioridad: ticket.prioridad.id,
      estatus: ticket.estatus,
      descripcionCambios: ticket.descripcionCambios,
      asignado: ticket.asignado?.id
    });
  }

  // objeto de registro
  private registro(usuario: any, response: any) {
    const registro = {
      modifico: usuario.id,
      ticket: response.Ticket.id,
      cambios: response.Ticket.descripcionCambios,
      prioridad: response.Ticket.prioridad.id,
      estatus: response.Ticket.estatus
    };
    return registro;
  }
}
