import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Especie } from 'src/app/models/especie.model';
import { Propriedade } from 'src/app/models/propriedade.model';
import { Vacina } from 'src/app/models/vacina.model';
import { Vacinacao } from 'src/app/models/vacinacao.model';
import { EspecieService } from 'src/app/services/especie.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { VacinacaoService } from 'src/app/services/vacinacao.service';

@Component({
  selector: 'app-vacinacao-info',
  templateUrl: './vacinacao-info.component.html',
  styleUrls: ['./vacinacao-info.component.css']
})
export class VacinacaoInfoComponent implements OnInit {

  vacinacao: Vacinacao = {
    data_vacina: '',
    quantidade: 0,
    id_especie: 0,
    id_propriedade: 0,
    id_vacina: 0,
    id: 0
  }

  especie: Observable<Especie>
  propriedade: Observable<Propriedade>
  vacina: Observable<Vacina>

  constructor(
    private router: Router,
    private activated_route: ActivatedRoute,
    private vacinacao_service: VacinacaoService,
    private especie_service: EspecieService,
    private propriedade_service: PropriedadeService,
  ) { }

  ngOnInit(): void {
    this.vacinacao.id = Number(this.activated_route.snapshot.paramMap.get('id'))
    this.loadVacinacao()
  }

  loadVacinacao(): void {
    this.vacinacao_service.getById(this.vacinacao.id).subscribe(response => {
      this.vacinacao = response
      this.especie = this.especie_service.getById(this.vacinacao.id_especie)
      this.propriedade = this.propriedade_service.getById(this.vacinacao.id_propriedade)
      this.vacina = this.vacinacao_service.getTipoVacinaById(this.vacinacao.id_vacina)
    })
  } 

}
