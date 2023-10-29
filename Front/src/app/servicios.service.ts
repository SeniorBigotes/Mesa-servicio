import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  error: any = null;
  activarError: boolean = false;
  constructor(public route: Router) { }
}
