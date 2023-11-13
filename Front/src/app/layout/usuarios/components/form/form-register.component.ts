import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormRegisterService } from '../../usuarios.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
  formUser!: FormGroup;
  roles!: any;
  modal: boolean = false;
  check: boolean = false;
  mensaje: string = "";

  constructor(private fb: FormBuilder,
              private formService: FormRegisterService) {}

  ngOnInit(): void {
    this.formUser = this.formulario();

    this.formService.getRoles().subscribe(resp => {
      this.roles = resp;
    });
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
    });
  }

  get getCorreo() { return this.formUser.get('correo') as FormControl }
  get getTelefono() { return this.formUser.get('telefono') as FormControl }

  // Crear
  crear() {
    if(this.formUser.valid) {
      // Exito
      this.formService.postUser(this.formUser.value).subscribe(resp => {
        this.mensaje = resp.mensaje;
        this.check = true;
        this.mostrarToast(1500);
        this.formUser.reset();
      }, err => { // Error
        this.mensaje = `Error en el código: ${err.message}`
        this.mostrarToast(5000)
      });
    } else { // No éxito
      this.mensaje = "Error al crear usuario";
      this.mostrarToast(2000);
    }
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
