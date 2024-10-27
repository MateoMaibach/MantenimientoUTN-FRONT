import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  private apiUrl = 'http://localhost:3000/api/ubicacion';

  constructor(private http: HttpClient) { }

  getUbicacion(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
