import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getPublicHello(): Observable<string> {
    return this.http.get(`${this.API_URL}/public/hello`, { responseType: 'text' });
  }

  getProtectedHello(): Observable<string> {
    return this.http.get(`${this.API_URL}/protected/hello`, { responseType: 'text' });
  }
}

