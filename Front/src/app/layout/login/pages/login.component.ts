import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from 'src/app/servicios.service';
import { LoginService } from '../login.service';
import { LoginRequest } from '../../../models/loginInterface';
import { Token } from 'src/app/models/Token';
import { Cuenta } from 'src/app/models/Cuenta';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  alert: boolean = false;
  mensaje: string = "";

  errorGeneral: any = this.serviciosService.error;
  alertGeneral: boolean = this.serviciosService.activarError;
  
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private serviciosService: ServiciosService) {}
    
    ngOnInit(): void {
      // asignamos valores a la variable
      this.formLogin = this.crearFormulario();
      
      // en caso de error de token
      setTimeout(() => {
        this.alertGeneral = false;
      }, 3000);
    }
    
  // llenamos datos
  private crearFormulario(): FormGroup {
    return this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  get getUser() { return this.formLogin.get('nombreUsuario') as FormControl; }
  get getPass() { return this.formLogin.get('contraseña') as FormControl; }

  // se valida la informacion
  inciarSesion(): void {
    if(this.formLogin.valid) {
      const login: LoginRequest = this.formLogin.value;
      // almacenar token y otras validaciones
      this.loginService.postLogin(login).subscribe({
        // alamcenar token
        next: (resp: Token) => this.loginService.loginUser(resp.token),
        error: (err: any) => this.error(true, 'reset', 'Credenciales inválidas'),
        //obener usuario
        complete: () => this.loginService.getCurrentUser().subscribe(user => this.comprobacion(user))
      });
    } else {
      this.error(true, 'markAllAsTouched', 'Es necesario llenar los campos');
    }
    // Quitar añerta despues de 3 segundos
    setTimeout(() => this.alert = false, 3000);
  } // end iniciarSesion()

  // crear formato a enviar
  private usuarioObject(user: any) {
    const usuario = {
      id: user.id,
      username: user.username,
      authority: user.authorities[0].authority
    }
    return usuario;
  }
  // alertas y errores
  private error(alert: boolean, method: string, mensaje: string): void {
    this.mensaje = mensaje;
    this.alert = alert;
    method === 'reset' ? 
        this.formLogin.reset() : this.formLogin.markAllAsTouched();
  }
  // comprobar estatus de usuario
  private comprobacion(user: any) {
    if(user.perfil.estatus === 'ACTIVO')  {
      this.loginService.setUser(this.usuarioObject(user));
      this.serviciosService.route.navigate(['/main']);
    } else {
      this.loginService.logOut();
      this.error(true, 'reset', 'Usuario Inactivo');
    }
  }
}
