import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private apiUrl = 'http://localhost:3000/api/sector';

  constructor(private http: HttpClient) { }

  getSector(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
