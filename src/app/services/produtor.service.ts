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

  getById(id: number): Observable<Produtor> {
    const url = `${this.base_url}/${id}`
    return this.http.get<Produtor>(url)
  }

  post(produtor: Produtor): Observable<Produtor> {
    return this.http.post<Produtor>(this.base_url, produtor)
  }

  pull(): void {

  }

  delete(id: number): Observable<any> {
    const url = `${this.base_url}/${id}`
    this.getEnderecoByIdProdutor(id).subscribe(response => {
      console.log(response)
      if (response.length == 0) console.log('Sem endereços')
      else {
        response.forEach(endereco => this.deleteEndereco(endereco.id).subscribe(() => {
          console.log('Endereço excluído')
        }))
      }
    })
    return this.http.delete<any>(url)
  }

  postEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.base_url_endereco, endereco)
  }

  getEnderecoByIdProdutor(id_produtor: number): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.base_url_endereco, {
      params: {'id_produtor': id_produtor}
    })
  }

  deleteEndereco(id: number): Observable<any> {
    const url = `${this.base_url_endereco}/${id}`
    return this.http.delete<any>(url)
  }

}
