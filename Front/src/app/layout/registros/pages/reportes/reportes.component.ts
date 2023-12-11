import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../../registros.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  constructor(private registrosService: RegistrosService){}
  
  ngOnInit() {
      
  }

  click() {
    this.registrosService.reporte(true);
  }
}
