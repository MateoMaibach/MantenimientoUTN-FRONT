import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.cookieService.get('token');

    // Si no hay token y estamos intentando acceder a una ruta que no es pública, redirigimos a login
    if (!token && route.routeConfig?.path !== 'login' && route.routeConfig?.path !== 'dashboard-inicio') {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.getUserRole();

    // Lógica de control de acceso según el rol del usuario
    if (userRole === 'admin') {
      return true; // El admin tiene acceso a todas las rutas
    } else if (userRole === 'operario') {
      if (route.routeConfig?.path === 'dashboard-op') {
        return true; // Permitir acceso a dashboard-op
      } else {
        alert('Acceso Denegado'); // Mostrar mensaje de acceso denegado
        return false; // Bloquear acceso
      }
    }

    // Redirigir a login si el rol no es reconocido
    this.router.navigate(['/login']);
    return false;
  }
}
