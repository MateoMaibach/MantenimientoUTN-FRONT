import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activo } from '../models/activo.model';  

@Injectable({
  providedIn: 'root'
})
export class ActivoService {
  private apiUrl = 'http://localhost:3000/api/activo';

  constructor(private http: HttpClient) { }

 
  getActivo(): Observable<Activo[]> {
    return this.http.get<Activo[]>(this.apiUrl);
  }

  
  addActivo(activo: Activo): Observable<Activo> {
    return this.http.post<Activo>(this.apiUrl, activo);
  }

  
  deleteActivo(tipo_activo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?tipo_activo=${tipo_activo}`);
  }
}
