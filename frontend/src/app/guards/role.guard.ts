import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/login.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = this.authService.getCurrentUser(); // Método que obtenga el usuario actual

    if (user && user.role === 'operario') {
      return true; // Permite el acceso si el rol es 'operario'
    }

    // Si el rol no es 'operario', redirige a la página de inicio o login
    this.router.navigate(['/login']);
    return false; // Bloquea el acceso
  }
}
