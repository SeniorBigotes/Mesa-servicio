import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from '../../tickets.service';
import { LoginService } from 'src/app/layout/login/login.service';
import { Router } from '@angular/router';

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
  prioridades!: any;
  errores: any;
  toastr: boolean = false;

  constructor(private fb: FormBuilder,
              private ticketsService: TicketsService,
              private loginService: LoginService,
              private router: Router) {}

  ngOnInit(): void {
    this.nuevoTicket = this.crearFormulario();

    this.ticketsService.getCategorias().subscribe(resp => this.categorias = resp, err => this.errores = err);
    this.ticketsService.getSecciones().subscribe(resp => this.secciones = resp, err => this.errores = err);
    this.ticketsService.getPrioridad().subscribe(resp => this.prioridades = resp, err => this.errores = err);
}
  // Obtener datos
  get getAsunto() {return this.nuevoTicket.get('asunto') as FormControl}
  get getSeccion() {return this.nuevoTicket.get('seccion') as FormControl}
  get getCategoria() {return this.nuevoTicket.get('categoria') as FormControl}
  get getPrioridad() {return this.nuevoTicket.get('prioridad') as FormControl}

  
  // no se conecta a la funcion
  crearTicket() {
    if(this.nuevoTicket.valid) {
      const ticketGenerado = {
        asunto: this.getAsunto.value,
        usuario: {id: this.loginService.getUser().id},
        seccion: {id: this.getSeccion.value},
        categoria: {id: this.getCategoria.value},
        prioridad: {id: this.getPrioridad.value}
      }
      this.ticketsService.postTickets(ticketGenerado).subscribe((resp: any) => {
        console.log(resp)
        this.nuevoTicket.reset();
        this.router.navigate(['/main/tickets/activos']);
      }, (err:any) => this.errores = err)
    } else {
      this.toast();
    }
    
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
      prioridad: ['', Validators.required]
    });
  }
}
