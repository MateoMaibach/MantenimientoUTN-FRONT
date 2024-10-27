import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {

  private apiUrl = 'http://localhost:3000/api/activo';

  constructor(private http: HttpClient) { }

  getActivo(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}