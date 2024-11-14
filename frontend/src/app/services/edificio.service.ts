import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {

  private apiUrl = 'http://localhost:3000/api/edificio'; 

  constructor(private http: HttpClient) { }

  
  GetEdificio(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  
  addEdificio(edificio: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, edificio);
  }

  
  deleteEdificio(nombre: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}?nombre=${nombre}`);
  }
 
}
