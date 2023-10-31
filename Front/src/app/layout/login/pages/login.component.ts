import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from 'src/app/servicios.service';
import { LoginService } from '../login.service';
import { LoginRequest } from '../components/loginInterface';
import { tokenResponse } from '../components/tokenResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  alert: boolean = false;

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
      this.loginService.postLogin(login).subscribe((resp: tokenResponse) => {
        // pasar token y obener usuario
        this.loginService.loginUser(resp.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          const usuario = {
            id: user.id,
            username: user.username,
            authority: user.authorities[0].authority
          }
          this.loginService.setUser(usuario);
          this.serviciosService.route.navigate(['/main']);
        }, err => console.log(err))
        this.alert = false;
        this.formLogin.reset();
      }, (err: any) => {
        this.alert = true;
        this.formLogin.reset();
      });
    } else {
      this.alert = true;
      this.formLogin.markAllAsTouched();
    }
    setTimeout(() => {
      this.alert = false;
    }, 3000);
  }
}
