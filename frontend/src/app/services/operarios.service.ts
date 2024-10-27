import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperariosService {

  private apiUrl = 'http://localhost:3000/api/operarios';
  
  constructor(private http: HttpClient) {}

  
  getOperarios(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/operarios`);
  }
}

  

