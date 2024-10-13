import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderadmComponent } from './components/headeradm/headeradm.component';
import { OperariosComponent } from './components/operarios/operarios.component';
import { RegistroComponent } from './components/registro/registro.component';

import { HeaderComponent } from './header/header.component';
import { OrdenTrabajoComponent } from './orden-trabajo/orden-trabajo.component';

import { FooterComponent } from './components/footer/footer.component';
import { BuscadorComponent } from './components/buscador/buscador.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    HeaderadmComponent,
    OperariosComponent,
    RegistroComponent 

    HeaderComponent,
    OrdenTrabajoComponent 

    FooterComponent,
    BuscadorComponent 


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
