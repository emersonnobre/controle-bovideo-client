import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rebanho } from '../models/rebanho.model';

@Injectable({
  providedIn: 'root'
})
export class RebanhoService {

  private base_url: string = 'http://localhost:3001/rebanho'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Rebanho[]> {
    return this.http.get<Rebanho[]>(this.base_url)
  }

  getByPropriedade(): void {
  }

  post(rebanho: Rebanho): Observable<Rebanho> {
    return this.http.post<Rebanho>(this.base_url, rebanho)
  }

  pull(): void {

  }

  delete(id: number): Observable<any> {
    const url = `${this.base_url}/${id}`
    return this.http.delete<any>(url)
  }

}
