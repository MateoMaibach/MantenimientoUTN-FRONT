import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Edificio } from '../models/edificio.model';  

@Injectable({
  providedIn: 'root'
})
export class EdificioService {
  private apiUrl = 'http://localhost:3000/api/edificio';

  constructor(private http: HttpClient) { }

  
  getEdificio(): Observable<Edificio[]> {
    return this.http.get<Edificio[]>(this.apiUrl);
  }

  
  addEdificio(edificio: Edificio): Observable<Edificio> {
    return this.http.post<Edificio>(this.apiUrl, edificio);
  }

  
  deleteEdificio(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?nombre=${nombre}`);
  }
}
