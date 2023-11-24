import { Component, OnInit } from '@angular/core';
import { FormRegisterService } from '../../usuarios.service';
import { Rol } from '../../../../models/RolesInterface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Seccion } from 'src/app/models/Seccion';
import { TicketsService } from 'src/app/layout/tickets/tickets.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {

  formMoidficarUsuario!: FormGroup;
  roles!: Rol[];
  secciones!: Seccion[];
  error: string = "";
  cuentas!: any;
  cuentaID!: number;
  mensaje: string = "";

  constructor(private usuariosService: FormRegisterService,
              private fb: FormBuilder,
              private ticketService: TicketsService) {}

  ngOnInit(): void {
    // Asignar formulario
    this.formMoidficarUsuario = this.formulario();
    // obtener datos
    this.usuariosService.getRoles().subscribe({
      next: roles => this.roles = roles,
      error: err => this.error = err
    });
    this.ticketService.getSecciones().subscribe(resp => this.secciones = resp);

    // modificar usuarios
    this.usuariosService.modificarUsuario$.subscribe({
      next: (cuenta: any) => {
        this.modificarFormulario(cuenta);
      }, error: (err: any) => console.log(err)
    });

    // Limipar formulario
    this.clear();
  }// end OnInit()

  get getNombreUsuario() { return this.formMoidficarUsuario.get('nombreUsuario') as FormControl; }
  get getContraseña() { return this.formMoidficarUsuario.get('contraseña') as FormControl; }
  get getNombre() { return this.formMoidficarUsuario.get('nombre') as FormControl; }
  get getApellidoP() { return this.formMoidficarUsuario.get('apellidoP') as FormControl; }
  get getApellidoM() { return this.formMoidficarUsuario.get('apellidoM') as FormControl; }
  get getCorreo() { return this.formMoidficarUsuario.get('correo') as FormControl; }
  get getTelefono() { return this.formMoidficarUsuario.get('telefono') as FormControl; }
  get getRol() { return this.formMoidficarUsuario.get('role') as FormControl; }
  get getSeccion() { return this.formMoidficarUsuario.get('seccion') as FormControl; }

  // Enviar datos (actualizar)
  enviar() {
    if(this.formMoidficarUsuario.valid) {
      // crear formato a enviar
      const usuarioModificado = this.formMoidficarUsuario.value;
      usuarioModificado.seccion = {id: this.getSeccion.value}
      // enviar
      this.usuariosService.putUsuario(usuarioModificado, this.cuentaID).subscribe({
        error: err => {
          if(err.status === 500) this.advertencia("Nombre de usuario ya existente");
        },
        complete: () => {
          this.clear();
          // Obtener datos ya actualizados
          this.usuariosService.getCuenta().subscribe({
            next: resp => {this.usuariosService.updatedUsers(resp)},
            error: err => { this.error = err },
          }); //end subscripcion getCuenta
        }
      });
    } else {
      this.advertencia("Faltan campos por llenar");
    }
  }

  // limiar formulario (trash)
  clear() {
    this.formMoidficarUsuario.reset();
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
      seccion: ['', Validators.required]
    });
  }

  private modificarFormulario(cuenta: any) {
    this.cuentaID = cuenta?.id;
        if(cuenta !== null || cuenta !== undefined) {
          this.formMoidficarUsuario.patchValue({
            nombreUsuario: cuenta?.nombreUsuario,
            contraseña: cuenta?.contraseña,
            nombre: cuenta?.perfil?.nombre,
            apellidoP: cuenta?.perfil?.apellidoP,
            apellidoM: cuenta?.perfil?.apellidoM,
            correo: cuenta?.perfil?.correo,
            telefono: cuenta?.perfil?.telefono,
            role: cuenta?.role,
            seccion: cuenta?.seccion?.id
          });
        }
  }

  private advertencia(str: string) {
    this.mensaje = str;
    setTimeout(() => this.mensaje = "", 2000);
  }
}
