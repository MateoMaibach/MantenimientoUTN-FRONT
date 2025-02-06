import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/api/usuarios';  
  constructor(private http: HttpClient) {}

  register(user: User): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, user);
  }
}
