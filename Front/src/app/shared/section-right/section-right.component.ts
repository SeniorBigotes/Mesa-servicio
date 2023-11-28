import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-section-right',
  templateUrl: './section-right.component.html',
  styleUrls: ['./section-right.component.scss']
})
export class SectionRightComponent implements OnInit {

  
  rutaActual!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        if(event.url.includes('/tickets')) this.almacenarUrl('tickets')
        if(event.url.includes('/users')) this.almacenarUrl('users')
        if(event.url.includes('/registros')) this.almacenarUrl('registros')
      }
    })
  }
  
  private almacenarUrl(url: string): void {
    this.rutaActual = url;
  }
}
