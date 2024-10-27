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
}
