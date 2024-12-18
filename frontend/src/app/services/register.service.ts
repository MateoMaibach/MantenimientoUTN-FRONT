import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/api/usuarios';  
  constructor(private http: HttpClient) {}

  register(user: { username: string, password: string, role: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
