import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { loginInterceptor } from './layout/login/login.interceptor';

@NgModule({
  declarations: [ // componentes
    AppComponent
  ],
  imports: [ // modulos
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [loginInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }