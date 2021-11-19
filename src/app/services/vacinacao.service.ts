import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacina } from '../models/vacina.model';
import { Vacinacao } from '../models/vacinacao.model';

@Injectable({
  providedIn: 'root'
})
export class VacinacaoService {

  base_url: string = 'http://localhost:3001/vacinacao'
  base_url_vacina: string = 'http://localhost:3001/vacina'

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Vacinacao[]> {
    return this.http.get<Vacinacao[]>(this.base_url)
  }

  getAllVacina(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(this.base_url_vacina)
  }

  post(vacinacao: Vacinacao): Observable<Vacinacao> {
    return this.http.post<Vacinacao>(this.base_url, vacinacao)
  }

  delete(id: number): Observable<any> {
    const url = `${this.base_url}/${id}`
    return this.http.delete<any>(url)
  }

}
