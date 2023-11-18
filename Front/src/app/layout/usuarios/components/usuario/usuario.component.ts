import { Component, OnInit } from '@angular/core';
import { FormRegisterService } from '../../usuarios.service';
import { Perfil } from '../../../../models/PerfilesInterface';
import { BehaviorSubject } from 'rxjs';
import { Rol } from 'src/app/models/RolesInterface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  cuentas: any = [];
  respaldoCuentas: any = [];

  modal: boolean = false;
  mensaje: string = "";
  nombre?: string;

  estatus: string = "";
  actualizado: boolean = false;

  roles: any;

  busquedaInput: string = "";
  usuarioBuscado: Array<any> = [];
  rolTextinput: string = "";
  estatusTextInput: string = "";
  /* Observables */
  private filtroEstatus = new BehaviorSubject<any>("");
  filtroEstatus$ = this.filtroEstatus.asObservable();
  private filtroRoles = new BehaviorSubject<any>("");
  filtroRoles$ = this.filtroRoles.asObservable();

  constructor(private usuariosService: FormRegisterService) {}

  ngOnInit(): void {
    // Estado incial (perfiles y cuentas)
    this.usuariosService.getCuenta().subscribe({
      next: resp => {
        this.cuentas = resp;
        this.respaldoCuentas = resp;
      }, error: err => this.mensaje = err});

    // Con estatus actualizado
    this.usuariosService.estatus$.subscribe({
      next: resp => {
        this.cuentas = resp;
        this.respaldoCuentas = resp;
      }, error: err => this.mensaje = err});

    // con cuentas actualizadas
    this.usuariosService.usuariosModificados$.subscribe({
      next: resp => {
        if(resp !== null) {
          this.cuentas = resp;
          this.respaldoCuentas = resp;
          this.actualizado = true;
          this.mensaje = `${this.nombre} se a actualizado con éxito`;
          this.mostrarToast(1700);
        }
      }, error: err => this.mensaje = err
    });

    // Obtener roles
    this.usuariosService.getRoles().subscribe(roles => this.roles = roles);
    
  } // end OnInit()

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

  // Buscar usuarios
  busqueda() {
    const terminosBusqueda = this.busquedaInput.toLowerCase().split(' ');

    // ejecucion de metodos de busqueda
    if (this.soloLetras(this.busquedaInput)) {
      if (terminosBusqueda.length === 2) {
        this.busquedaNombreApellidoP_M(terminosBusqueda);
        if(this.usuarioBuscado.length === 0) {
          this.busquedaApellidoP_M(terminosBusqueda);
        }
      } else if (terminosBusqueda.length === 1) {
        this.busquedaPorTerminoUnico(terminosBusqueda[0]);
      }
    } else {
      this.busquedaPorTelefono(terminosBusqueda[0]);
    }
    // datos a visualizar
    this.cuentas = this.usuarioBuscado.length > 0 ? this.usuarioBuscado : this.respaldoCuentas;
  }
  // Detecta cambios
  aplicarFiltro() {

    if(this.estatusTextInput !== '') { // filtro por estatus
      this.filtroEstatus.next(this.estatusTextInput);

      if(this.estatusTextInput === 'ACTIVO') this.filtrarEstatus();
      if(this.estatusTextInput === 'INACTIVO') this.filtrarEstatus();

    } else if(this.rolTextinput !== '') { // filtro por roles
      this.filtroRoles.next(this.rolTextinput);

      for(let i = 0; i < this.roles.length ; i++) {
        if(this.rolTextinput === this.roles[i].rolName) this.filtrarRoles();
      }

    } else if(this.estatusTextInput === '' || this.rolTextinput === ''){ // resetear
      this.cuentas = this.respaldoCuentas;
    }
  }
  // Filtrar por estatus
  private filtrarEstatus() {
    this.filtroEstatus$.subscribe({
      next: resp => {
        this.usuarioBuscado = this.cuentas.filter((cuenta: any) => cuenta.perfil.estatus === resp);
        this.cuentas = this.usuarioBuscado.length > 0 ? this.usuarioBuscado : this.respaldoCuentas;
        this.usuarioBuscado = [];
      }});
    }
    private filtrarRoles() {
      this.filtroRoles$.subscribe({
        next: resp => {
          this.usuarioBuscado = this.cuentas.filter((cuenta:any) => cuenta.role === resp);
          this.cuentas = this.usuarioBuscado.length > 0 ? this.usuarioBuscado : this.respaldoCuentas;
          this.usuarioBuscado = [];
        }
    });
  }

  /* BUSQUEDA DE USUARIOS */
  // Por nombre y apellido Materno o Paterno
  private busquedaNombreApellidoP_M(terminosBusqueda: string[]) {
    const nombre = terminosBusqueda[0];
    const apellidoP = terminosBusqueda[1];
    const apellidoM = terminosBusqueda[1];

    this.usuarioBuscado = this.cuentas.filter((cuenta: any) =>
      (cuenta.perfil.nombre.toLowerCase().includes(nombre) 
        && cuenta.perfil.apellidoP.toLowerCase().includes(apellidoP)) ||
      (cuenta.perfil.nombre.toLowerCase().includes(nombre) 
        && cuenta.perfil.apellidoM.toLowerCase().includes(apellidoM))
    );
  }
  // Por apellido paterno y materno
  private busquedaApellidoP_M(terminosBusqueda: string[]) {
    const apellidoP = terminosBusqueda[0];
    const apellidoM = terminosBusqueda[1];

    this.usuarioBuscado = this.cuentas.filter((cuenta: any) =>
      cuenta.perfil.apellidoP.toLowerCase().includes(apellidoP) &&
      cuenta.perfil.apellidoM.toLowerCase().includes(apellidoM)
    );
  }
  // por nombre, apellidos (materno o paterno) o nombre de usuario
  private busquedaPorTerminoUnico(termino: string) {
    this.usuarioBuscado = this.cuentas.filter((cuenta: any) =>
      cuenta.nombreUsuario.toLowerCase().includes(termino) ||
      cuenta.perfil.nombre.toLowerCase().includes(termino) ||
      cuenta.perfil.apellidoP.toLowerCase().includes(termino) ||
      cuenta.perfil.apellidoM.toLowerCase().includes(termino)
    );
  }
  // Por telefono
  private busquedaPorTelefono(termino: string) {
    const busqueda = parseInt(termino, 10);
    this.usuarioBuscado = this.cuentas.filter((cuenta: any) => cuenta.perfil.telefono.includes(busqueda));
  }
  // Verificar si su buscan palabras o numeros
  private soloLetras(str: string): boolean {
    return /^[A-Za-z\s]+$/.test(str);
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
