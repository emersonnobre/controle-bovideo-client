import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Municipio } from 'src/app/models/municipio.model';
import { Propriedade } from 'src/app/models/propriedade.model';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';

@Component({
  selector: 'app-propriedade-read',
  templateUrl: './propriedade-read.component.html',
  styleUrls: ['./propriedade-read.component.css']
})
export class PropriedadeReadComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'inscricao_estadual', 'municipio','actions']
  dataSource: any[] = []
  municipios: Municipio[] = []

  constructor(
    private router: Router,
    private propriedade_service: PropriedadeService,
    private municipio_service: MunicipioService,
  ) { }

  ngOnInit(): void {
    this.municipio_service.getAll().subscribe(response => this.municipios = response)
    this.propriedade_service.getAll().subscribe(response => this.dataSource = response)
    // Carregando o nome dos municípios pelo id obtido
    setTimeout(() => {
      this.dataSource.forEach(propriedade => {
        const nome_municipio = this.municipios.find(municipio => municipio.id == propriedade.id_municipio)
        propriedade.id_municipio = nome_municipio.descricao
      })
    }, 2000)
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

}
