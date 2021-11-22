import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda.model';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  base_url: string = 'http://localhost:3001/venda'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.base_url)
  }

  getById(id: number): Observable<Venda> {
    const url = `${this.base_url}/${id}`
    return this.http.get<Venda>(url)
  }
  
  post(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.base_url, venda)
  }

  delete(id: number): Observable<any> {
    const url = `${this.base_url}/${id}`
    return this.http.delete<any>(url)
  }

}
