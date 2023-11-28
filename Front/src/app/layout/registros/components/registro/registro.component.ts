import { Component } from '@angular/core';
import { Registro } from 'src/app/models/Registro';
import { RegistrosService } from '../../registros.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registros: Registro[] = [];

  constructor(private registrosService: RegistrosService) {}
  
  ngOnInit(): void {
    this.registrosService.getRegistros().subscribe((registros: Registro[]) => this.registros = registros);
  }

  atiende(id: number, registro: Registro): boolean {
    if(id === registro.id) {
      if(registro.ticket.asignado === null) return true;
    } return false 
  }
}
