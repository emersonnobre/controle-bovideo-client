import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Propriedade } from '../models/propriedade.model';

@Injectable({
  providedIn: 'root'
})
export class PropriedadeService {

  baseUrl: string = 'http://localhost:3001/propriedade'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Propriedade[]> {
    return this.http.get<Propriedade[]>(this.baseUrl)
  }

  getByInscricao(inscricao_estadual: string): Observable<Propriedade> {
    const url = `${this.baseUrl}?inscricao_estadual=${inscricao_estadual}`
    return this.http.get<Propriedade>(url)
  }

  post(propriedade: Propriedade): Observable<Propriedade> {
    return this.http.post<Propriedade>(this.baseUrl, propriedade)
  }
}
