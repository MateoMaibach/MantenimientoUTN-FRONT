import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PisoService {

  private apiUrl = 'http://localhost:3000/api/piso'; 

  constructor(private http: HttpClient) { }

  
  getPiso(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  
  addPiso(piso: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, piso);
  }

  
  deletePiso(nombre: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}?nombre=${nombre}`);
  
  }
}
