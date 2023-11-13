import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRegisterRoutingModule } from './usuarios-routing.module';
import { FormRegisterComponent } from './components/form/form-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages/pages.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FormRegisterComponent,
    PagesComponent,
    UsuarioComponent,
  ],
  imports: [
    CommonModule,
    FormRegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormRegisterModule { }
