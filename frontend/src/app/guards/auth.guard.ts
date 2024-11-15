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

    
    if (!token && route.routeConfig?.path !== 'login' && route.routeConfig?.path !== 'dashboard-inicio') {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.getUserRole();

    
    if (userRole === 'admin') {
      return true; 
    } else if (userRole === 'operario') {
      if (route.routeConfig?.path === 'dashboard-op') {
        return true; 
      } else {
        alert('Acceso Denegado'); 
        return false; 
      }
    }

    
    this.router.navigate(['/login']);
    return false;
  }
}
