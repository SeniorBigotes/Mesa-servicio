import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormRegisterService } from '../../usuarios.service';
import { TicketsService } from 'src/app/layout/tickets/tickets.service';
import { Seccion } from 'src/app/models/Seccion';
import { Rol } from 'src/app/models/RolesInterface';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
  formUser!: FormGroup;
  roles!: Rol[];
  secciones!: Seccion[];
  modal: boolean = false;
  check: boolean = false;
  mensaje: string = "";

  constructor(private fb: FormBuilder,
              private formService: FormRegisterService,
              private ticketService: TicketsService) {}

  ngOnInit(): void {
    this.formUser = this.formulario();

    // Obtener datos
    this.formService.getRoles().subscribe(resp => this.roles = resp);
    this.ticketService.getSecciones().subscribe(resp => this.secciones = resp);
  }
  
  private formulario(): FormGroup {
    return this.fb.group({
      nombreUsuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoP: ['', Validators.required],
      apellidoM: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.min(10)]],
      role: ['', Validators.required],
      seccion: [{id: 0}, Validators.required]
    });
  }

  get getCorreo() { return this.formUser.get('correo') as FormControl }
  get getTelefono() { return this.formUser.get('telefono') as FormControl }
  get getSeccion() { return this.formUser.get('seccion') as FormControl }

  // Crear
  crear() {
    const formulario = this.formUser.value;
    formulario.seccion = {id: this.getSeccion.value}
    if(this.formUser.valid) {
      // Exito
      this.formService.postUser(formulario).subscribe({
        next: resp => {
          this.mensaje = resp.mensaje;
        }, error: err => { // Error
          this.mensaje = `Error en el código: ${err.message}`
          this.mostrarToast(5000)
        }, complete: () => {
          this.check = true;
          this.mostrarToast(1500);
          this.formUser.reset();
      }
    });
    } else { // No éxito
      this.mensaje = "Error al crear usuario";
      this.mostrarToast(2000);
    }
  }

  // Mostrar el toast (modal)
  private mostrarToast(time: number): void {
    this.modal = true;
    setTimeout(() => {
        this.modal = false;
      }, time);
  }
  
  cerrarToast() {
    this.modal = false
  }
}
