import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operario } from '../models/operario.model'; 

@Injectable({
  providedIn: 'root'
})
export class OperariosService {
  private apiUrl = 'http://localhost:3000/api/operarios';

  constructor(private http: HttpClient) {}

  
  getOperarios(): Observable<Operario[]> {
    return this.http.get<Operario[]>(this.apiUrl);
  }
}


  

