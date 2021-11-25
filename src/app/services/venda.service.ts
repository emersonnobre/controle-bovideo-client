import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda.model';
import { EspecieService } from './especie.service';
import { ProdutorService } from './produtor.service';
import { PropriedadeService } from './propriedade.service';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  base_url: string = 'http://localhost:3000/api/venda'
  base_url_compra: string = 'http://localhost:3000/api/compra'

  constructor(
    private http: HttpClient,
    private propriedade_service: PropriedadeService,
    private produtor_service: ProdutorService,
    private especie_service: EspecieService,
  ) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.base_url)
  }

  getById(id: number): Observable<Venda> {
    const url = `${this.base_url}?id=${id}`
    return this.http.get<Venda>(url)
  }

  getByIdProdutor(id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.produtor_service.getById(id).subscribe(produtor => {
        const url = `${this.base_url}?cpf=${produtor.cpf}`
        this.http.get<any[]>(url).subscribe(response => resolve(response))
      })
    })
  }

  getComprasByIdProdutor(id: number): Promise<Venda[]> {
    const vendas: Venda[] = []
    return new Promise((resolve, reject) => {
      this.produtor_service.getById(id).subscribe(produtor => {
        const url = `${this.base_url_compra}/${produtor.cpf}`
        this.http.get<any[]>(url).subscribe(response => resolve(response))
      })
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
