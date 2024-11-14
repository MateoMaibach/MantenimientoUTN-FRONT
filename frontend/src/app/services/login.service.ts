import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login'; // Endpoint para login

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Método para hacer login
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token); // Guarda el token en la cookie
        }
      })
    );
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return this.cookieService.check('token'); 
  }

  // Obtener el nombre de usuario actual desde el token
  getCurrentUser(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.username || null; // Retorna el username del token si existe
    }
    return null;
  }

  // Obtener el rol del usuario desde el token
  getUserRole(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.role || ''; // Retorna el rol del token si existe
    }
    return ''; // Si no hay rol, retorna una cadena vacía
  }

  // Método para guardar el token en cookies con fecha de expiración
  setToken(token: string): void {
    const now = new Date();
    const expiresIn = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutos de expiración
    this.cookieService.set('token', token, { expires: expiresIn });
  }

  // Obtener el token almacenado en las cookies
  getToken(): string | null {
    return this.cookieService.get('token');
  }

  // Método para decodificar el token (JWT)
  private decodeToken(token: string): any {
    const base64Url = token.split('.')[1]; // Obtener la segunda parte del token (payload)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Decodificar el Base64
    return JSON.parse(window.atob(base64)); // Parsear el payload del token
  }

  // Obtener datos protegidos (requiere estar autenticado)
  getProtectedData(): Observable<any> {
    const protectedUrl = 'http://localhost:3000/api/protected'; // URL protegida
    return this.http.get(protectedUrl, { withCredentials: true });
  }

  // Método para cerrar sesión, eliminando el token
  logout(): void {
    this.cookieService.delete('token');
  }
}
