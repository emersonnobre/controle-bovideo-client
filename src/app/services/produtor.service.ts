import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getAll(): void {

  }

  getByCpf(cpf: string): Produtor {
    const produtor = this.produtores.find(produtor => produtor.cpf == cpf)
    if (produtor) return produtor
    else return null
  }

  post(): void {

  }

  pull(): void {

  }

}
