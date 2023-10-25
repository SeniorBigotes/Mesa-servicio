import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from 'src/app/servicios.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin!: FormGroup;
  alert: boolean = false;
  error: string = "";
  
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private serviciosService: ServiciosService) {}
    
    ngOnInit(): void {
      // asignamos valores a la variable
      this.formLogin = this.crearFormulario();
    }
    
  // llenamos datos
  crearFormulario(): FormGroup {
    return this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  get getUser() { return this.formLogin.get('nombreUsuario') as FormControl; }
  get getPass() { return this.formLogin.get('contraseña') as FormControl; }

  // se valida la informacion
  inciarSesion(): void {
    const login = this.formLogin.value;
    // almacenar token
    this.loginService.postLogin(login).subscribe((token: any) => {
      this.loginService.setToken(token.token);
      this.alert = false;
    }, (err: any) => {
      this.error = err.error;
      this.alert = true;
    });

    if(this.loginService.getToken.length > 0) {
      this.serviciosService.setViewPage(true);
      this.serviciosService.route.navigate(['/main']);
    }
  }
}
