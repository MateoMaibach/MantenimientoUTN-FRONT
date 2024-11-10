import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrdenTrabajo {
  OT_num: number;
  codigo_unico: string;
  operario_username: string;

}

@Injectable({
  providedIn: 'root'
})
export class OrdentrabajoService {
  private apiUrl = 'http://localhost:3000/api/ordentrabajo'; // Ajusta la URL a la de tu API

  constructor(private http: HttpClient) {}

  // Obtener todas las órdenes de trabajo
  getOrdenesTrabajo(): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(this.apiUrl);
  }
}
