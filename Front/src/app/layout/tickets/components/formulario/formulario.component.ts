import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {

  nuevoTicket!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.nuevoTicket = this.crearFormulario();
  }

  // no se conecta a la funcion
  crearTicket(): void {
    console.log("enviando")
  }

  private crearFormulario() {
    return this.fb.group({
      asunto: ['', Validators.required],
      seccion: ['', Validators.required],
      categoria: ['', Validators.required],
      prioridad: ['', Validators.required]
    }) 
  }
}
