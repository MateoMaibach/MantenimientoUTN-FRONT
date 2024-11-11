import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiUrl = 'http://localhost:3000/api/tareas'; // Cambia esto según la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener todas las tareas
  getTarea(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTareasFormateadas(tareas: string[]): string {
    return tareas.join(' • ');  // Separa las tareas con un símbolo o texto.
  }
  

  // Método para obtener tareas por activo y grupo
  getTareasPorActivoGrupo(tipoActivo: string, grupo: string): Observable<any[]> {
    const url = `http://localhost:3000/tareas-por-activo-grupo?tipo_activo=${tipoActivo}&grupo=${grupo}`;
    return this.http.get<any[]>(url);
  }
}
