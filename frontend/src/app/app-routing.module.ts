import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardHistorialComponent } from './pages/dashboard-historial/dashboard-historial.component';
import { DashboardOtComponent } from './pages/dashboard-ot/dashboard-ot.component';
import { DashboardOpComponent } from './pages/dashboard-op/dashboard-op.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path:'dashboard-historial', component: DashboardHistorialComponent },
  { path: 'dashboard-ot', component: DashboardOtComponent },
  { path:'dashboard-op', component: DashboardOpComponent },
  { path:'register', component: RegisterComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
