import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private apiUrl = 'http://localhost:3000/api/sector'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  // Obtener la lista de sectores
  getSector(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Agregar un nuevo sector
  addSector(sector: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, sector);
  }

  // Eliminar un sector por ID o nombre, según lo que maneje la API
  deleteSector(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
