import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from '../models/municipio.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  baseUrl: string = 'http://localhost:3001/municipio'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.baseUrl)
  }
  
  getById(id: number): Observable<Municipio> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Municipio>(url)
  }
}
