import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './components/login/login.component';
import { HeaderadmComponent } from './components/headeradm/headeradm.component';
import { OperariosComponent } from './components/operarios/operarios.component';
import { RegistroComponent } from './components/registro/registro.component';

import { HeaderComponent } from './components/header/header.component';
import { OrdenTrabajoComponent } from './components/orden-trabajo/orden-trabajo.component';
import { FooterComponent } from './components/footer/footer.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { HistorialComponent } from './components/historial/historial.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardHistorialComponent } from './pages/dashboard-historial/dashboard-historial.component';
import { DashboardOtComponent } from './pages/dashboard-ot/dashboard-ot.component';
import { DashboardOpComponent } from './pages/dashboard-op/dashboard-op.component';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderadmComponent,
    OperariosComponent,
    RegistroComponent ,
    HeaderComponent,
    OrdenTrabajoComponent, 
    FooterComponent,
    BuscadorComponent,
    HistorialComponent,
    LoginPageComponent,
    DashboardPageComponent,
    DashboardHistorialComponent,
    DashboardOtComponent,
    DashboardOpComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
