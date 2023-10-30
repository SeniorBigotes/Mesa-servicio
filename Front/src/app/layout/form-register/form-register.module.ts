import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRegisterRoutingModule } from './form-register-routing.module';
import { FormRegisterComponent } from './components/form/form-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages/pages.component';


@NgModule({
  declarations: [
    FormRegisterComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormRegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormRegisterModule { }
