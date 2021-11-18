import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produtor } from '../models/produtor.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutorService {

  base_url: string = 'http://localhost:3001/produtor'

  produtores: Produtor[] = [
    { id: 1, nome: 'Alberto', cpf: '60' },
    { id: 2, nome: 'Carlito', cpf: '30' },
    { id: 3, nome: 'Joãotop', cpf: '50' },
  ]

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Produtor[]> {
    return this.http.get<Produtor[]>(this.base_url)
  }

  getByCpf(cpf: string): Observable<Produtor> {
    const url = `${this.base_url}?cpf=${cpf}`
    return this.http.get<Produtor>(url)
  }

  post(): void {

  }

  pull(): void {

  }

}
