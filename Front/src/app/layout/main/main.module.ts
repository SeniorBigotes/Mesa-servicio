import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PageComponent } from './page/page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    PageComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
