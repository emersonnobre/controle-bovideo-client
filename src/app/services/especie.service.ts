import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especie } from '../models/especie.model';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  baseUrl: string = 'http://localhost:3001/especie'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Especie[]> {
    return this.http.get<Especie[]>(this.baseUrl)
  }

  getById(id: number): Observable<Especie> {
    return this.http.get<Especie>(this.baseUrl)
  }
  
}
