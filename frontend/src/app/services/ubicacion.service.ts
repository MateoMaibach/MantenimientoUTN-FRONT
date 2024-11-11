import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  private apiUrl = 'http://localhost:3000/api/ubicacion'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  // Obtener la lista de ubicaciones
  getUbicacion(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Agregar una nueva ubicación
  addUbicacion(ubicacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, ubicacion);
  }

  // Eliminar una ubicación por ID o nombre, según lo que maneje la API
  deleteUbicacion(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
