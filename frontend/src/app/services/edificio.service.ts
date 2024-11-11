import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {

  private apiUrl = 'http://localhost:3000/api/edificio'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  // Obtener la lista de edificios
  GetEdificio(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Agregar un nuevo edificio
  addEdificio(edificio: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, edificio);
  }

  // Eliminar un edificio por ID o nombre, según lo que maneje la API
  deleteEdificio(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
