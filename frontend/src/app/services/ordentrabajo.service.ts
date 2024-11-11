// src/app/services/ordentrabajo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrdenTrabajo {
  OT_num?: number;
  codigo_unico?: any;
  operario_username: string;
  fecha: string;
  observacion: string;
  edificio_nombre: string;
  tarea_descripcion: string;
  sector_nombre: string;
  piso_nombre: string;
  ubicacion_descripcion: string;
  tipo_activo: string;
  tareas: string; // Cambiamos a string para JSON
}

@Injectable({
  providedIn: 'root'
})
export class OrdentrabajoService {
  private apiUrl = 'http://localhost:3000/api/ordentrabajo';
  private apiUrl1 = 'http://localhost:3000/api/ordentrabajo/id/'

  constructor(private http: HttpClient) {}

  // Método para obtener todas las órdenes de trabajo
  getOrdenesTrabajo(): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(this.apiUrl);
  }

  // Método para crear una nueva orden de trabajo
  createOrdenTrabajo(ordenTrabajo: OrdenTrabajo): Observable<OrdenTrabajo> {
    return this.http.post<OrdenTrabajo>(this.apiUrl, ordenTrabajo);
  }

  // Método para obtener las órdenes de trabajo de un operario específico
  getOrdenesPorOperario(username: string): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(`${this.apiUrl}/${username}`);
  }

  getOrdenesTrabajoID(id: number): Observable<OrdenTrabajo> {
    return this.http.get<OrdenTrabajo>(`${this.apiUrl1}${id}`);
  }

  eliminarOrden(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
