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

  constructor(private http: HttpClient) {}

  getOrdenesTrabajo(): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(this.apiUrl);
  }

  createOrdenTrabajo(ordenTrabajo: OrdenTrabajo): Observable<OrdenTrabajo> {
    return this.http.post<OrdenTrabajo>(this.apiUrl, ordenTrabajo);
  }
}
