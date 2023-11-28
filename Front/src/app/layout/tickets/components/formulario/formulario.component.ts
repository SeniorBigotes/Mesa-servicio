import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from '../../tickets.service';
import { LoginService } from 'src/app/layout/login/login.service';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/Ticket';
import { RegistrosService } from 'src/app/layout/registros/registros.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {

  nuevoTicket!: FormGroup;
  validar: boolean = true;
  categorias!: any;
  secciones!: any;
  asignados?: any;
  usuariosSeccion: any[] = []
  prioridades!: any;
  errores: any;
  toastr: boolean = false;
  rolUser: string = '';
  visualizar: boolean = false;

  constructor(private fb: FormBuilder,
              private ticketsService: TicketsService,
              private loginService: LoginService,
              private registrosService: RegistrosService,
              private router: Router) {}

  ngOnInit(): void {
    // Obtener rol
    this.rolUser = this.loginService.getUserRol();
    this.visualizar = this.rolUser !== 'BECARIO' ? true : false;
    // formulario ticket
    this.nuevoTicket = this.crearFormulario();

    // Obtener datos para crear ticket
    this.ticketsService.getCategorias().subscribe({next: resp => this.categorias = resp, error: err => this.errores = err});
    this.ticketsService.getSecciones().subscribe({next: resp => this.secciones = resp, error: err => this.errores = err});
    this.ticketsService.getPrioridad().subscribe({next: resp => this.prioridades = resp, error: err => this.errores = err});
  }
  // Obtener datos
  get getAsunto() {return this.nuevoTicket.get('asunto') as FormControl}
  get getSeccion() {return this.nuevoTicket.get('seccion') as FormControl}
  get getCategoria() {return this.nuevoTicket.get('categoria') as FormControl}
  get getPrioridad() {return this.nuevoTicket.get('prioridad') as FormControl}
  get getAsignado() {return this.nuevoTicket.get('asignado') as FormControl}

  // crear ticket
  crearTicket() {
    if(this.rolUser === 'BECARIO') {
      const ticketGenerado: Ticket = this.formBecarioColaborador();
      this.getAsunto.value !== '' && (this.getCategoria.value !== '' && this.getSeccion.value !== '') ? 
          this.enviar(ticketGenerado) : this.toast();
    } else {
      const ticketGenerado: any = this.formAdmin();
      this.nuevoTicket.valid ?
        this.enviar(ticketGenerado) : this.toast();
    }
  }

  // Obtener usuaros de el area seleccionada
  usuariosArea(id: number) {
    this.ticketsService.getAsignados(id).subscribe(asignados => this.usuariosSeccion = asignados); 
  }

  // Toast
  toast() {
    this.toastr = true;
    setTimeout(() => this.toastr = false, 1500);
  }

  private enviar(datos: Ticket) {
    this.ticketsService.postTickets(datos).subscribe({
        // generar el reporte
        next: resp => {
          const usuario = this.loginService.getUser();
          this.registrosService.postRegistro(this.registro(usuario, resp))
              .subscribe();
        // resto de funciones
        }, complete: () => {
        this.nuevoTicket.reset();
        this.router.navigate(['/main/tickets/activos']);
      }, error: err => this.errores = err});
  }
  /* FORMULARIOS */
  private crearFormulario(): FormGroup {
    return this.fb.group({
      asunto: ['', Validators.required],
      seccion: ['', Validators.required],
      categoria: ['', Validators.required],
      prioridad: ['', Validators.required],
      asignado: ['', Validators.required]
    });
  }

  private formAdmin() {
    const form: Ticket = {
        asunto: this.getAsunto.value,
        autor: {id: this.loginService.getUser().id},
        seccion: {id: this.getSeccion.value},
        categoria: {id: this.getCategoria.value},
        prioridad: {id: this.getPrioridad.value},
        asignado: {id: this.getAsignado.value}
      }
      return form;
  }
  
  private formBecarioColaborador() {
    const form = {
        asunto: this.getAsunto.value,
        autor: {id: this.loginService.getUser().id},
        seccion: {id: this.getSeccion.value},
        categoria: {id: this.getCategoria.value}
      }
      return form;
  }

  private registro(usuario: any, response: any) {
    const registro = {
      modifico: usuario.id,
      ticket: response.ticket.id,
      cambios: response.ticket.asunto,
      prioridad: response.ticket.prioridad.id,
      estatus: response.ticket.estatus
    }
    return registro;
  }
}
