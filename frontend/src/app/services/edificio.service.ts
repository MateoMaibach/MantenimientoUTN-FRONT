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
}
