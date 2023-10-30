import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/layout/login/login.service';
import { MainService } from 'src/app/layout/main/main.service';
import { ServiciosService } from 'src/app/servicios.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  authority: string = this.mainService.authority;
  
  constructor(private mainService: MainService) {}

  ngOnInit(): void {
  }
  
}
