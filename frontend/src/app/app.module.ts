import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderadmComponent } from './components/headeradm/headeradm.component';
import { OperariosComponent } from './components/operarios/operarios.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderadmComponent,
    OperariosComponent,
    RegistroComponent 
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
