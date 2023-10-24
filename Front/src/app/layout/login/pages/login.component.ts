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
  cuenta: any = [];
  
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private loginApp: ServiciosService) {}
    
    ngOnInit(): void {
      // asignamos valores a la variable
      this.formLogin = this.crearFormulario();

      // peticion url
      this.loginService.getAllCuentas().subscribe(response => this.cuenta.push(response), err => console.log(err));
    }
    
  // llenamos datos
  crearFormulario(): FormGroup {
    return this.formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  get getUser() { return this.formLogin.get('user') as FormControl; }
  get getPass() { return this.formLogin.get('pass') as FormControl; }

  // se valida la informacion
  inciarSesion(): void {
    // valida al dar submit
    const front = this.formLogin.value;
    const back = this.cuenta;
    
    if(!this.loginService.login(front, back)) {
      this.alert = true;
      this.formLogin.reset(); //limpia el formulario
      return;
    }
    this.formLogin.reset();
    this.alert = false;
  }
}
