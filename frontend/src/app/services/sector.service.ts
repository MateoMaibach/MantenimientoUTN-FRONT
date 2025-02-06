import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sector } from '../models/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private apiUrl = 'http://localhost:3000/api/sector';

  constructor(private http: HttpClient) { }

  
  getSector(): Observable<Sector[]> {
    return this.http.get<Sector[]>(`${this.apiUrl}`);
  }

  
  addSector(sector: any): Observable<Sector> {
    return this.http.post<Sector>(`${this.apiUrl}`, sector);
  }

  
  deleteSector(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?nombre=${nombre}`);
  }
}
