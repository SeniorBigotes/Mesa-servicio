import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { loginInterceptor } from './layout/login/login.interceptor';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ticketsInterceptor } from './layout/tickets/tickets.interceptor';

@NgModule({
  declarations: [ // componentes
    AppComponent
  ],
  imports: [ // modulos
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    loginInterceptor,
    ticketsInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }