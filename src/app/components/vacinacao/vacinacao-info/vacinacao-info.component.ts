import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacinacao } from 'src/app/models/vacinacao.model';
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

  constructor(
    private router: Router,
    private activated_route: ActivatedRoute,
    private vacinacao_service: VacinacaoService,
  ) { }

  ngOnInit(): void {
    this.vacinacao.id = Number(this.activated_route.snapshot.paramMap.get('id'))
    this.loadVacinacao()
  }

  loadVacinacao(): void {
    this.vacinacao_service.getById(this.vacinacao.id).subscribe(response => this.vacinacao = response)
  } 

}
