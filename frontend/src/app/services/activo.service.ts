import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {

  private apiUrl = 'http://localhost:3000/api/activo'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  // Obtener la lista de activos
  getActivo(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Agregar un nuevo activo
  addActivo(activo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, activo);
  }

  // Eliminar un activo por ID o nombre, según lo que maneje la API
  deleteActivo(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
