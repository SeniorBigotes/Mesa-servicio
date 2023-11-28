import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrosRoutingModule } from './registros-routing.module';
import { RegistrosComponent } from './pages/registros.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegistrosComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    RegistrosRoutingModule,
    FormsModule
  ]
})
export class RegistrosModule { }
