import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../models/endereco.model';
import { Produtor } from '../models/produtor.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutorService {

  base_url: string = 'http://localhost:3001/produtor'
  base_url_endereco: string = 'http://localhost:3001/endereco'

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

  post(produtor: Produtor): Observable<Produtor> {
    return this.http.post<Produtor>(this.base_url, produtor)
  }

  pull(): void {

  }

  postEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.base_url_endereco, endereco)
  }

}
