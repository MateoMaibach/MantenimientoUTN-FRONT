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

  // Crear una nueva orden de trabajo (POST)
  createOrdenTrabajo(ordenTrabajo: OrdenTrabajo): Observable<OrdenTrabajo> {
    return this.http.post<OrdenTrabajo>(this.apiUrl, ordenTrabajo);
  }
}
