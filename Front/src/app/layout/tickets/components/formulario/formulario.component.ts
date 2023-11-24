import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from '../../tickets.service';
import { LoginService } from 'src/app/layout/login/login.service';
import { Router } from '@angular/router';
import { FormRegisterService } from 'src/app/layout/usuarios/usuarios.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {

  nuevoTicket!: FormGroup;
  validar: boolean = false;
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
              private usuariosService: FormRegisterService,
              private router: Router) {}

  ngOnInit(): void {
    // Obtener rol
    this.rolUser = this.loginService.getUserRol();
    this.visualizar = this.rolUser === 'ADMINISTRADOR' ? true : false;
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

  
  crearTicket() {
    if(this.nuevoTicket.valid) {
      const ticketGenerado = {
        asunto: this.getAsunto.value,
        autor: {id: this.loginService.getUser().id},
        seccion: {id: this.getSeccion.value},
        categoria: {id: this.getCategoria.value},
        prioridad: {id: this.getPrioridad.value},
        asignado: {id: this.getAsignado.value}
      }
      this.ticketsService.postTickets(ticketGenerado).subscribe({
        complete: () => {
        this.nuevoTicket.reset();
        this.router.navigate(['/main/tickets/activos']);
      }, error: err => this.errores = err});
    } else {
      this.toast();
    }
  }

  usuariosArea(id: number) {
    this.ticketsService.getAsignados(id).subscribe(asignados => this.usuariosSeccion = asignados); 
  }

  toast() {
    this.toastr = true;
    setTimeout(() => {
      this.toastr = false;
    }, 2000);
  }

  private crearFormulario(): FormGroup {
    return this.fb.group({
      asunto: ['', Validators.required],
      seccion: ['', Validators.required],
      categoria: ['', Validators.required],
      prioridad: ['', Validators.required],
      asignado: ['', Validators.required]
    });
  }
}
