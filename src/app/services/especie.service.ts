import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especie } from '../models/especie.model';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  base_url: string = 'http://localhost:3000/api/especie'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Especie[]> {
    return this.http.get<Especie[]>(this.base_url)
  }

  getById(id: number): Observable<Especie> {
    const url = `${this.base_url}/${id}`
    return this.http.get<Especie>(url)
  }
  
}
