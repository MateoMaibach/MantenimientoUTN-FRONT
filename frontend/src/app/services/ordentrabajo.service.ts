
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
  tareas: string; 
}

@Injectable({
  providedIn: 'root'
})
export class OrdentrabajoService {
  private apiUrl = 'http://localhost:3000/api/ordentrabajo';
  private apiUrl1 = 'http://localhost:3000/api/ordentrabajo/id/'
  private apiUrl2= 'http://localhost:3000/api/ordentrabajo/ac/'
  

  constructor(private http: HttpClient) {}

  
  getOrdenesTrabajo(): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(this.apiUrl);
  }

  
  createOrdenTrabajo(ordenTrabajo: OrdenTrabajo): Observable<OrdenTrabajo> {
    return this.http.post<OrdenTrabajo>(this.apiUrl, ordenTrabajo);
  }

  
  getOrdenesPorOperario(username: string): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(`${this.apiUrl}/${username}`);
  }
  

  getOrdenesTrabajoID(id: number): Observable<OrdenTrabajo> {
    return this.http.get<OrdenTrabajo>(`${this.apiUrl1}${id}`);
  }

  eliminarOrden(id_orden: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_orden}`);
  }
  

  
  getOrdenesTrabajoAC(tipo_activo: string): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(`${this.apiUrl2}/${tipo_activo}`);
  }

  getOrdenesPorOperarioYActivo(operario_username: string, tipo_activo: string): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(`${this.apiUrl}/${operario_username}/activo/${tipo_activo}`);
  }

  
}
