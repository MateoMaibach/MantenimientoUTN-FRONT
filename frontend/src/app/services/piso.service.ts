import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piso } from '../models/piso.model';

@Injectable({
  providedIn: 'root'
})
export class PisoService {

  private apiUrl = 'http://localhost:3000/api/piso'; 

  constructor(private http: HttpClient) { }

  
  getPiso(): Observable<Piso[]> {
    return this.http.get<Piso[]>(this.apiUrl);
  }

  
  addPiso(piso: Piso): Observable<Piso> {
    return this.http.post<Piso>(this.apiUrl, piso);
  }

  
  deletePiso(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?nombre=${nombre}`);
  }
}
