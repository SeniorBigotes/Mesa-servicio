import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MainService } from 'src/app/layout/main/main.service';

@Component({
  selector: 'app-section-right',
  templateUrl: './section-right.component.html',
  styleUrls: ['./section-right.component.scss']
})
export class SectionRightComponent implements OnInit {
 
  // saber la ruta actual
  url!: string;
  private ruta = new BehaviorSubject<string>("");
  ruta$ = this.ruta.asObservable();
  
  constructor(private router: Router,
              private mainService: MainService) {}

  ngOnInit(): void {
    // ruta inicial
    this.url = this.mainService.urlActual;
    this.verRuta(this.url);
    
    // actualozar ruta
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.verRuta(event.url);
      }
    });

    // cargar componente
    this.ruta$.subscribe(url => {
      if(url.includes('/tickets')) this.url = 'tickets';
      if(url.includes('/users')) this.url = 'users';
      if(url.includes('/registros')) this.url = 'registros';
    })
  }

  // cargar la ruta en tiempo real
  private verRuta(str: string) {
    this.ruta.next(str);
  }
}
