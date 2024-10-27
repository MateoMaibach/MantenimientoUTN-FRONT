import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';  

  constructor(private http: HttpClient, private cookieService: CookieService) { }

 
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password }, { withCredentials: true }).pipe(
      tap((response: any) => {
        
        const token = response.token;  
        this.setToken(token);  
      })
    );
  }

  
  isLoggedIn(): boolean {
    return this.cookieService.check('token'); 
  }


  
  setToken(token: string): void {
    const now = new Date();
    const expiresIn = new Date(now.getTime() + 15 * 60 * 1000); 
    this.cookieService.set('token', token, { expires: expiresIn });
  }

 
  getToken(): string | null {
    return this.cookieService.get('token');
  }

  
  getProtectedData(): Observable<any> {
    const protectedUrl = 'http://localhost:3000/api/';  
    return this.http.get(protectedUrl, { withCredentials: true });
  }
}
