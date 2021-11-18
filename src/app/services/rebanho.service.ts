import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rebanho } from '../models/rebanho.model';

@Injectable({
  providedIn: 'root'
})
export class RebanhoService {

  private baseUrl: string = 'http://localhost:3001/rebanho'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Rebanho[]> {
    return this.http.get<Rebanho[]>(this.baseUrl)
  }

  getByPropriedade(): void {
  }

  post(rebanho: Rebanho): Observable<Rebanho> {
    return this.http.post<Rebanho>(this.baseUrl, rebanho)
  }

  pull(): void {

  }
}
