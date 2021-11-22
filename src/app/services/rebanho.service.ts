import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  } from 'rxjs';
import { Rebanho } from '../models/rebanho.model';
import { PropriedadeService } from './propriedade.service';

@Injectable({
  providedIn: 'root'
})
export class RebanhoService {

  private base_url: string = 'http://localhost:3001/rebanho'

  constructor(
    private http: HttpClient,
    private propriedade_service: PropriedadeService,
  ) { }

  getAll(): Observable<Rebanho[]> {
    return this.http.get<Rebanho[]>(this.base_url)
  }

  getByIdPropriedade(id: number): Observable<Rebanho[]> {
    const url = `${this.base_url}?id_propriedade=${id}`
    return this.http.get<Rebanho[]>(url)
  }

  getByIdProdutor(id: number): Promise<Rebanho[]> {
    const rebanho: Rebanho[] = []
    return new Promise((resolve, reject) => {
      this.propriedade_service.getByIdProdutor(id).toPromise()
        .then(propriedades => {
          propriedades.forEach(propriedade => {
            this.getByIdPropriedade(propriedade.id).toPromise()
              .then(rebanhos => rebanho.push(...rebanhos))
          })
        })
        .finally(() => resolve(rebanho))
    })
  }

  getById(id: number): Observable<Rebanho> {
    const url = `${this.base_url}/${id}`
    return this.http.get<Rebanho>(url)
  } 

  post(rebanho: Rebanho): Observable<Rebanho> {
    return this.http.post<Rebanho>(this.base_url, rebanho)
  }

  delete(id: number): Observable<any> {
    const url = `${this.base_url}/${id}`
    return this.http.delete<any>(url)
  }

}
