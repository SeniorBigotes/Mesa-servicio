import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-right',
  templateUrl: './section-right.component.html',
  styleUrls: ['./section-right.component.scss']
})
export class SectionRightComponent implements OnInit {

  rutaActual!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.rutaActual = this.router.url;
  }

  ruta(): boolean {
    return this.rutaActual.startsWith('/main/tickets');
  }
}
