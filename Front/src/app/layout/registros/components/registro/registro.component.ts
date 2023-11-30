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
  respaldo: Registro[] = [];
  registrosBuscado: Registro[] = [];
  boton: string = "registros"

  constructor(private registrosService: RegistrosService) {}
  
  ngOnInit(): void {
    // obtener registros (principal)
    this.registrosService.getRegistros().subscribe((registros: Registro[]) => {
      this.registros = registros;
      this.respaldo = registros;
    });

    // Buscar (registros o tickets)
    this.registrosService.boton$.subscribe((resp: string) => {
      this.boton = resp;
      this.registros = this.respaldo;
      if(resp === 'tickets') { // hacerlo una funcion
        this.registrosService.getRegistrosTicket().subscribe((regTick: Registro[]) => {
          this.registrosBuscado = regTick
          this.registros = this.registrosBuscado;
        });
      }
    });

    // Filtrar por busqueda
    this.registrosService.busquedaInput$.subscribe(resp => {
      this.registros = this.respaldo;
      if(resp !== '') !this.soloLetras(resp) ? this.busqueda(resp) : this.registros = this.respaldo;
    });
  }// end onInit()

  // Marca de color rojo a los que no estan atendidos
  atiende(id: number, registro: Registro): boolean {
    if(id === registro.id) {
      if(registro.ticket.asignado === null) return true;
    } return false 
  }
  // Verificar si su buscan palabras o numeros
  private soloLetras(str: string): boolean {
    return /^[A-Za-z\s]+$/.test(str);
  }
  
  // buscar por ID
  private busqueda(busquedaID: string): void {
    const id = parseInt(busquedaID); 
    this.registrosBuscado = this.boton === 'registros' ? 
        this.registros.filter((registros: Registro) => registros.id === id) : 
        this.registros.filter((registros: Registro) => registros.ticket.id === id);

    this.registros = this.registrosBuscado;
    this.registrosBuscado = [];
  }

  private ordenarTickets() {

  }
}
