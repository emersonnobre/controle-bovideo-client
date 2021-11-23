import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda.model';
import { PropriedadeService } from './propriedade.service';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  base_url: string = 'http://localhost:3000/api/venda'

  constructor(
    private http: HttpClient,
    private propriedade_service: PropriedadeService,
  ) { }

  getAll(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.base_url)
  }

  getById(id: number): Observable<Venda> {
    const url = `${this.base_url}/${id}`
    return this.http.get<Venda>(url)
  }

  getByIdProdutor(id: number): Promise<Venda[]> {
    const vendas: Venda[] = []
    return new Promise((resolve, reject) => {
      this.propriedade_service.getByIdProdutor(id).toPromise()
        .then(propriedades => {
          propriedades.forEach(propriedade => {
            const url = `${this.base_url}?id_propriedade_origem=${propriedade.id}`
            this.http.get<Venda[]>(url).subscribe(response => {
              vendas.push(...response)
            })
          })
        })
        .finally(() => resolve(vendas))
    })
  }

  getComprasByIdProdutor(id: number): Promise<Venda[]> {
    const vendas: Venda[] = []
    return new Promise((resolve, reject) => {
      this.propriedade_service.getByIdProdutor(id).toPromise()
        .then(propriedades => {
          propriedades.forEach(propriedade => {
            const url = `${this.base_url}?id_propriedade_destino=${propriedade.id}`
            this.http.get<Venda[]>(url).subscribe(response => {
              vendas.push(...response)
            })
          })
        })
        .finally(() => resolve(vendas))
    })
  }
  
  post(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.base_url, venda)
  }

  delete(id: number): Observable<any> {
    const url = `${this.base_url}/${id}`
    return this.http.delete<any>(url)
  }

}
