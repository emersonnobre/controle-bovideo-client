import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Propriedade } from '../models/propriedade.model';

@Injectable({
  providedIn: 'root'
})
export class PropriedadeService {

  base_url: string = 'http://localhost:3001/propriedade'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Propriedade[]> {
    return this.http.get<Propriedade[]>(this.base_url)
  }

  getByInscricao(inscricao_estadual: string): Observable<Propriedade> {
    const url = `${this.base_url}?inscricao_estadual=${inscricao_estadual}`
    return this.http.get<Propriedade>(url)
  }

  post(propriedade: Propriedade): Observable<Propriedade> {
    return this.http.post<Propriedade>(this.base_url, propriedade)
  }

  delete(id: number): Observable<any> {
    const url = `${this.base_url}/${id}`
    return this.http.delete<any>(url)
  }

}
