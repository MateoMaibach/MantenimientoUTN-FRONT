import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'http://localhost:3000/api/tarea';

  constructor(private http: HttpClient) {}

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  createTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  getTareasFormateadas(tareas: string[]): string {
    return tareas.join(' • ');  
  }
  

  
  getTareasPorActivoGrupo(tipoActivo: string, grupo: string): Observable<any[]> {
    const url = `http://localhost:3000/tareas-por-activo-grupo?tipo_activo=${tipoActivo}&grupo=${grupo}`;
    return this.http.get<any[]>(url);
  }
}
