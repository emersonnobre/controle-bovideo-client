import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Municipio } from 'src/app/models/municipio.model';
import { Produtor } from 'src/app/models/produtor.model';
import { Propriedade } from 'src/app/models/propriedade.model';
import { MunicipioService } from 'src/app/services/municipio.service';
import { ProdutorService } from 'src/app/services/produtor.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { RebanhoService } from 'src/app/services/rebanho.service';
import { VacinacaoService } from 'src/app/services/vacinacao.service';

@Component({
  selector: 'app-propriedade-info',
  templateUrl: './propriedade-info.component.html',
  styleUrls: ['./propriedade-info.component.css']
})
export class PropriedadeInfoComponent implements OnInit {

  propriedade: Propriedade = {
    nome: '',
    inscricao_estadual: '',
    id_municipio: 0,
    id_produtor: 0,
  }

  municipio: Observable<Municipio>
  produtor: Observable<Produtor>
  rebanhos: any[]
  vacinacoes: any[]

  constructor(
    private router: Router,
    private activated_route: ActivatedRoute,
    private propriedade_service: PropriedadeService,
    private municipio_service: MunicipioService,
    private produtor_service: ProdutorService,
    private rebanho_service: RebanhoService,
    private vacinacao_service: VacinacaoService,
  ) { }

  ngOnInit(): void {
    this.propriedade.inscricao_estadual = this.activated_route.snapshot.paramMap.get('id')
    this.loadPropriedade()
  }
  
  loadPropriedade(): void {
    this.propriedade_service.getByInscricao(this.propriedade.inscricao_estadual).subscribe(response => {
      this.propriedade = response
      this.municipio = this.municipio_service.getById(response.id_municipio)
      this.produtor = this.produtor_service.getById(response.id_produtor)
      this.rebanho_service.getByIdPropriedade(this.propriedade.inscricao_estadual).subscribe(response => this.rebanhos = response)
      this.vacinacao_service.getByPropriedade(this.propriedade.inscricao_estadual).subscribe(response => this.vacinacoes = response)
    })
  }

}
