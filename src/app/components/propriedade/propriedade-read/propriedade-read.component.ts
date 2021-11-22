import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { verificaNumero } from 'src/app/directives/utils';
import { Municipio } from 'src/app/models/municipio.model';
import { Propriedade } from 'src/app/models/propriedade.model';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-propriedade-read',
  templateUrl: './propriedade-read.component.html',
  styleUrls: ['./propriedade-read.component.css']
})
export class PropriedadeReadComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'inscricao_estadual', 'municipio','actions']
  dataSource: any[] = []

  municipios: Municipio[] = []
  propriedade: Propriedade = {
    nome: '',
    inscricao_estadual: '',
    id_municipio: 0,
    id_produtor: 0
  }

  constructor(
    private router: Router,
    private propriedade_service: PropriedadeService,
    private municipio_service: MunicipioService,
    private shared_service: SharedService,
  ) { }

  ngOnInit(): void {
    this.municipio_service.getAll().subscribe(response => this.municipios = response)
    this.loadAllPropriedades()
    // Carregando o nome dos municípios pelo id obtido
    setTimeout(() => {
      this.dataSource.forEach(propriedade => {
        const nome_municipio = this.municipios.find(municipio => municipio.id == propriedade.id_municipio)
        propriedade.id_municipio = nome_municipio.descricao
      })
    }, 2000)
  }

  loadAllPropriedades(): void {
    this.propriedade_service.getAll().subscribe(response => this.dataSource = response)
  }

  loadMunicipioName(id: number) {
    let result
    new Promise((resolve, reject) => {
      this.municipio_service.getById(id).subscribe(response => {
        try {
          resolve(response.descricao)
        } catch (err) {
          reject(err)
        }
      })
    }).then(response => result = response)
  }

  redirectToCreate(): void {
    this.router.navigate(['propriedade/create'])
  }

  redirectToUpdate(id: number): void {
    this.router.navigate([`propriedade/update/${id}`])
  }

  redirectToInfo(id: number): void {
    this.router.navigate([`propriedade/info/${id}`])
  }

  delete(id: number) {
    this.propriedade_service.delete(id).subscribe(() => {
      this.shared_service.showMessage('Propriedadade deletada')
      setTimeout(() => window.location.reload(), 900)
    })
  }

  searchPropriedade(): void {
    if (this.propriedade.inscricao_estadual.length === 0) {
      this.loadAllPropriedades()
      return this.shared_service.showMessage('Informe a inscrição estadual completa', true)
    }
    if (!verificaNumero(Array.from(this.propriedade.inscricao_estadual))) {
      this.loadAllPropriedades()
      return this.shared_service.showMessage('Somente números', true)
    }
    this.propriedade_service.getByInscricao(this. propriedade.inscricao_estadual).subscribe(response => {
      if (response[0]) {
        this.dataSource = [response[0]]
      } else {
        this.loadAllPropriedades()
        this.shared_service.showMessage('Nenhuma propriedade encontrada', true)
      }
    })
  }

}
