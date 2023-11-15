import { Component, OnInit } from '@angular/core';
import { FormRegisterService } from '../../usuarios.service';
import { Perfil } from '../PerfilesInterface';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  perfiles: Array<Perfil> = [];
  cuentas: any = [];
  modal: boolean = false;
  mensaje: string = "";
  estatus: string = "";
  actualizado: boolean = false;
  nombre?: string;

  constructor(private usuariosService: FormRegisterService) {}

  ngOnInit(): void {
    // Estado incial (perfiles y cuentas)
    this.usuariosService.getPerfil().subscribe({next: resp => this.perfiles = resp, error: err => this.mensaje = err});
    this.usuariosService.getCuenta().subscribe({next: resp => this.cuentas = resp, error: err => this.mensaje = err});
    // Con estatus actualizado
    this.usuariosService.estatus$.subscribe({next: resp => this.cuentas = resp, error: err => this.mensaje = err});
    // con cuentas actualizadas
    this.usuariosService.usuariosModificados$.subscribe({
      next: resp => {
        if(resp !== null) {
          this.cuentas = resp;
          this.actualizado = true;
          this.mensaje = `${this.nombre} se a actualizado con éxito`;
          this.mostrarToast(1700);
        }
      }, error: err => this.mensaje = err
    });
  }

  // Actualizar estatus
  cambiarEstatus(estatusUsuario: string, id: number): void {
    // establecer estatus y enviar
    const estatus = { estatus: estatusUsuario === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO' }
    this.usuariosService.putEstatus(estatus, id).subscribe({
      error: err => {
        this.mensaje = `Mensaje: ${err.name}, Código estatus: ${err.status}`;
        this.mostrarToast(5000);
      },
      complete: () => {
        this.usuariosService.getCuenta().subscribe(resp => this.usuariosService.estatusS(resp));
      }
    });
  }

  // Modificar usuario
  modificar(id: number): void {
    this.usuariosService.getCuentaId(id).subscribe({
      next: resp => {
        this.usuariosService.updateUser(resp);
        this.nombre = resp.perfil.nombre;
    }});
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
