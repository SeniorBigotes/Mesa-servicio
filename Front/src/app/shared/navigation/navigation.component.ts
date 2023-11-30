import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/layout/login/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  authority: string = this.loginService.authority;
  
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
  }
  
}
