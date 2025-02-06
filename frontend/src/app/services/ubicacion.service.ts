import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ubicacion } from '../models/ubicacion.model';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  private apiUrl = 'http://localhost:3000/api/ubicacion'; 

  constructor(private http: HttpClient) { }

  
  getUbicacion(): Observable<Ubicacion[]>{
    return this.http.get<Ubicacion[]>(`${this.apiUrl}`);
  }

  
  addUbicacion(ubicacion: any): Observable<Ubicacion[]> {
    return this.http.post<Ubicacion[]>(`${this.apiUrl}`, ubicacion);
  }

  
  deleteUbicacion(descripcion: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?descripcion=${descripcion}`);
  }
}
