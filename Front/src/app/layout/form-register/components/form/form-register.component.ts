import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormRegisterService } from '../../form-register.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
  formUser!: FormGroup;
  roles!: any;

  constructor(private fb: FormBuilder,
              private formService: FormRegisterService) {}

  ngOnInit(): void {
    this.formUser = this.formulario();

    this.formService.getRoles().subscribe(resp => {
      this.roles = resp;
    })
  }
  
  private formulario(): FormGroup {
    return this.fb.group({
      nombreUsuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoP: ['', Validators.required],
      apellidoM: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  get getCorreo() {return this.formUser.get('correo') as FormControl}

  crear() {
    console.log(this.formUser.value);
  }
}
