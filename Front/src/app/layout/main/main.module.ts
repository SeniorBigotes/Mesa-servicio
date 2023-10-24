import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PageComponent } from './page/page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
