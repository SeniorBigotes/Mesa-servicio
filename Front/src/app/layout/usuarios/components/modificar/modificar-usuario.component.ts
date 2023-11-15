import { Component, OnInit } from '@angular/core';
import { FormRegisterService } from '../../usuarios.service';
import { Rol } from '../RolesInterface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {

  formMoidficarUsuario!: FormGroup;
  roles!: Rol[];
  error: string = "";
  cuentas!: any;
  cuentaID!: number;
  mensaje: string = "";

  constructor(private usuariosService: FormRegisterService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    // Asignar formulario
    this.formMoidficarUsuario = this.formulario();
    this.usuariosService.getRoles().subscribe({
      next: roles => this.roles = roles,
      error: err => this.error = err
    });
    
    // modificar usuarios
    this.usuariosService.modificarUsuario$.subscribe({
      next: (cuenta: any) => {
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
            role: cuenta?.role
          });
        }
      },
      error: (err: any) => this.error = err
    });

    // Limipar formulario
    this.clear();
  }

  get getNombreUsuario() { return this.formMoidficarUsuario.get('nombreUsuario') as FormControl; }
  get getContraseña() { return this.formMoidficarUsuario.get('contraseña') as FormControl; }
  get getNombre() { return this.formMoidficarUsuario.get('nombre') as FormControl; }
  get getApellidoP() { return this.formMoidficarUsuario.get('apellidoP') as FormControl; }
  get getApellidoM() { return this.formMoidficarUsuario.get('apellidoM') as FormControl; }
  get getCorreo() { return this.formMoidficarUsuario.get('correo') as FormControl; }
  get getTelefono() { return this.formMoidficarUsuario.get('telefono') as FormControl; }
  get getRol() { return this.formMoidficarUsuario.get('role') as FormControl; }

  // Enviar datos (actualizar)
  enviar() {
    if(this.formMoidficarUsuario.valid) {
      // crear formato a enviar
      const usuarioModificado = {
        nombreUsuario: this.getNombreUsuario.value,
        contraseña: this.getContraseña.value,
        nombre:  this.getNombre.value,
        apellidoP: this.getApellidoP.value,
        apellidoM: this.getApellidoM.value,
        correo: this.getCorreo.value,
        telefono: this.getTelefono.value,
        role: this.getRol.value
      }
      // enviar
      this.usuariosService.putUsuario(usuarioModificado, this.cuentaID).subscribe({
        error: err => this.error = err,
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
      this.advertencia();
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
      role: ['', Validators.required]
    })
  }

  private advertencia() {
    this.mensaje = "Faltan campos por llenar"
  }
}
