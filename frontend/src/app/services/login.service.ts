import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthResponse } from '../models/auth-response.model';  
import { DecodedToken } from '../models/decoded-token.model';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  private apiUrl = 'http://localhost:3000/api/login'; 

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  
  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, { username, password }).pipe(
      tap((response: AuthResponse) => {
        if (response.token) {
          this.setToken(response.token); 
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token'); 
  }

  getCurrentUser(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.username || null; 
    }
    return null;
  }

  getUserRole(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.role || ''; 
    }
    return ''; 
  }

  setToken(token: string): void {
    const now = new Date();
    const expiresIn = new Date(now.getTime() + 15 * 60 * 1000); 
    this.cookieService.set('token', token, { expires: expiresIn });
  }

  getToken(): string | null {
    return this.cookieService.get('token');
  }

  
  private decodeToken(token: string): DecodedToken {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    return JSON.parse(window.atob(base64)); 
  }

  
  getProtectedData(): Observable<{ message: string }> {
    const protectedUrl = 'http://localhost:3000/api/protected'; 
    return this.http.get<{ message: string }>(protectedUrl, { withCredentials: true });
  }

  logout(): void {
    this.cookieService.delete('token');
  }
}
