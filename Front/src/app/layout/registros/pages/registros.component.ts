import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../registros.service';
import { Registro } from 'src/app/models/Registro';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit {

  input: string = '';

  // Subject y observable
  // Busqueda
  private busquedaInput = new BehaviorSubject<string>("");
  busquedaInput$ = this.busquedaInput.asObservable();

  constructor() {}
  
  ngOnInit(): void {

  }

  // funcion de la barra de busqueda
  buscar() {
    this.busqueda(this.input);
    this.busquedaInput$.subscribe(resp => {
      console.log(resp);
    })
  }

  // Subject de la busqueda
  private busqueda(str: string) {
    this.busquedaInput.next(str)
  }
}
