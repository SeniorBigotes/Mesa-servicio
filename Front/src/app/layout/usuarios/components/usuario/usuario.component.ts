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
  modal: boolean = false;
  mensaje: string = "";
  estatus: string = "";

  constructor(private usuariosService: FormRegisterService) {}

  ngOnInit(): void {
    // Estado incial
    this.usuariosService.getPerfil().subscribe(resp => this.perfiles = resp, err => this.mensaje = err);
    // Con estatus actualizado
    this.usuariosService.estatus$.subscribe(resp => this.perfiles = resp, err => this.mensaje = err);
  }

  // Actualizar estatus
  cambiarEstatus(estatusUsuario: string, id: number): void {
    const estatus = {
      estatus: estatusUsuario === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
    }
    this.usuariosService.putEstatus(estatus, id).subscribe(resp => {
      // Escuchar cambios
      this.usuariosService.getPerfil().subscribe(resp => this.usuariosService.estatusS(resp));
    }, err => {
      console.log(err)
      this.mensaje = `Mensaje: ${err.name}, Código estatus: ${err.status}`;
      this.mostrarToast(5000);
    });
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
