import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PisoService {

  private apiUrl = 'http://localhost:3000/api/piso'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  // Obtener la lista de pisos
  getPiso(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Agregar un nuevo piso
  addPiso(piso: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, piso);
  }

  // Eliminar un piso por ID o nombre, según lo que maneje la API
  deletePiso(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
