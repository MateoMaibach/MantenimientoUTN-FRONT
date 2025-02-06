import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/login.service'; 

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = this.authService.getCurrentUser(); 

    if (user && user.role === 'operario') {
      return true; 
    }

    // Si el rol no es 'operario', redirige a la página de inicio o login
    this.router.navigate(['/login']);
    return false; // Bloquea el acceso
  }
}
