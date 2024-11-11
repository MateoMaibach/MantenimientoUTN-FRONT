import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardHistorialComponent } from './pages/dashboard-historial/dashboard-historial.component';
import { DashboardOtComponent } from './pages/dashboard-ot/dashboard-ot.component';
import { DashboardOpComponent } from './pages/dashboard-op/dashboard-op.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard'; 
import { DashboardInicioComponent } from './pages/dashboard-inicio/dashboard-inicio.component';  // Importa el componente

const routes: Routes = [
  { path: '', redirectTo: '/dashboard-inicio', pathMatch: 'full' },  // Redirige a dashboard-inicio
  { path: 'login', component: LoginPageComponent },  // Página de login
  {
    path: 'dashboard-inicio',
    component: DashboardInicioComponent,  // Página de inicio del dashboard
    // No se aplica AuthGuard aquí, ya que es accesible sin autenticación
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard]  // Ruta protegida por AuthGuard
  },
  {
    path: 'dashboard-historial',
    component: DashboardHistorialComponent,
    canActivate: [AuthGuard]  // Ruta protegida por AuthGuard
  },
  {
    path: 'dashboard-ot',
    component: DashboardOtComponent,
    canActivate: [AuthGuard]  // Ruta protegida por AuthGuard
  },
  {
    path: 'dashboard-op',
    component: DashboardOpComponent,
    canActivate: [AuthGuard]  // Ruta protegida por AuthGuard
  },
  { 
    path: 'register', 
    component: RegisterComponent, 
    canActivate: [AuthGuard]  // Ruta protegida por AuthGuard
  },
  { path: '**', redirectTo: '/dashboard-inicio' }  // Redirige cualquier ruta no encontrada a dashboard-inicio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
