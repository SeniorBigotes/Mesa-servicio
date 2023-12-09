import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../../registros.service';
import { Registro } from 'src/app/models/Registro';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit {

  input: string = '';

  constructor(private registrosService: RegistrosService) {}
  
  ngOnInit(): void {
  }

  // funcion de la barra de busqueda
  buscar() {
    this.registrosService.busqueda(this.input);
  }

  // botones (registros / tickets)
  btnRegistro(str: string) {
    this.registrosService.botones(str);
  }
  btnTicket(str: string) {
    this.registrosService.botones(str);
  }

  
}
