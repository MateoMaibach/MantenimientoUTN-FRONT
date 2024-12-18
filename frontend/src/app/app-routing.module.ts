import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardHistorialComponent } from './pages/dashboard-historial/dashboard-historial.component';
import { DashboardOtComponent } from './pages/dashboard-ot/dashboard-ot.component';
import { DashboardOpComponent } from './pages/dashboard-op/dashboard-op.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard'; 
import { DashboardInicioComponent } from './pages/dashboard-inicio/dashboard-inicio.component';  

const routes: Routes = [
  { path: '', redirectTo: '/dashboard-inicio', pathMatch: 'full' },  
  { path: 'login', component: LoginPageComponent },  
  {
    path: 'dashboard-inicio',
    component: DashboardInicioComponent,  
    
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'dashboard-historial',
    component: DashboardHistorialComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'dashboard-ot',
    component: DashboardOtComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'dashboard-op',
    component: DashboardOpComponent,
    canActivate: [AuthGuard]  
  },
  { 
    path: 'register', 
    component: RegisterComponent, 
    canActivate: [AuthGuard]  
  },
  { path: '**', redirectTo: '/dashboard-inicio' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
