import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacina } from '../models/vacina.model';
import { Vacinacao } from '../models/vacinacao.model';

@Injectable({
  providedIn: 'root'
})
export class VacinacaoService {

  base_url: string = 'http://localhost:3000/api/vacina'
  base_url_vacina: string = 'http://localhost:3000/api/vacina/tipo'

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.base_url)
  }

  getById(id: number): Observable<any> {
    const url = `${this.base_url}?id=${id}`
    return this.http.get<any>(url)
  }

  getByPropriedade(inscricao: string): Observable<any[]> {
    const url = `${this.base_url}?inscricao_estadual=${inscricao}`
    return this.http.get<any[]>(url)
  }

  getAllTipoVacina(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(this.base_url_vacina)
  }

  getTipoVacinaById(id: number): Observable<Vacina> {
    const url = `${this.base_url_vacina}/${id}`
    return this.http.get<Vacina>(url)
  }

  post(vacinacao: Vacinacao): Observable<Vacinacao> {
    return this.http.post<Vacinacao>(this.base_url, vacinacao)
  }

  delete(id: number): Observable<any> {
    const url = `${this.base_url}/${id}`
    return this.http.delete<any>(url)
  }

}
