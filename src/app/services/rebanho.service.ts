import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  } from 'rxjs';
import { Rebanho } from '../models/rebanho.model';
import { EspecieService } from './especie.service';
import { PropriedadeService } from './propriedade.service';

@Injectable({
  providedIn: 'root'
})
export class RebanhoService {

  private base_url: string = 'http://localhost:3000/api/rebanho'

  constructor(
    private http: HttpClient,
    private propriedade_service: PropriedadeService,
    private especie_service: EspecieService,
  ) { }

  getAll(): Observable<Rebanho[]> {
    return this.http.get<Rebanho[]>(this.base_url)
  }

  getAllVacinados(): Observable<Rebanho[]> {
    const url = `${this.base_url}/vacinados`
    return this.http.get<Rebanho[]>(url)
  }

  getAllEntradas(): Observable<Rebanho[]> {
    const url = `${this.base_url}/entradas`
    return this.http.get<Rebanho[]>(url)
  }

  getByIdPropriedade(id: string): Observable<Rebanho[]> {
    const url = `${this.base_url}?inscricao_estadual_propriedade=${id}`
    return this.http.get<Rebanho[]>(url)
  }

  getByCpfProdutor(cpf: string): Observable<any[]> {
    console.log(cpf)
    const url = `${this.base_url}?cpf_produtor=${cpf}`
    return this.http.get<any[]>(url)
  }

  getById(id: number): Observable<Rebanho> {
    const url = `${this.base_url}/${id}`
    return this.http.get<Rebanho>(url)
  } 

  post(rebanho: Rebanho): Observable<Rebanho> {
    return this.http.post<Rebanho>(this.base_url, rebanho)
  }

  delete(id: number): Observable<any> {
    const url = `${this.base_url}/entrada/${id}`
    return this.http.delete<any>(url)
  }

}