import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Propriedade } from 'src/app/models/propriedade.model';
import { PropriedadeService } from 'src/app/services/propriedade.service';

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
    id: 0
  }

  constructor(
    private router: Router,
    private activated_route: ActivatedRoute,
    private propriedade_service: PropriedadeService,
  ) { }

  ngOnInit(): void {
    this.propriedade.id = Number(this.activated_route.snapshot.paramMap.get('id'))
    this.loadPropriedade()
  }

  loadPropriedade(): void {
    this.propriedade_service.getById(this.propriedade.id).subscribe(response => this.propriedade = response)
  }

}
