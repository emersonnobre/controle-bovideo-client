import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from 'src/app/models/endereco.model';
import { Produtor } from 'src/app/models/produtor.model';
import { Propriedade } from 'src/app/models/propriedade.model';
import { Rebanho } from 'src/app/models/rebanho.model';
import { Venda } from 'src/app/models/venda.model';
import { ProdutorService } from 'src/app/services/produtor.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { RebanhoService } from 'src/app/services/rebanho.service';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-produtor-info',
  templateUrl: './produtor-info.component.html',
  styleUrls: ['./produtor-info.component.css']
})
export class ProdutorInfoComponent implements OnInit {

  produtor: Produtor = {
    nome: '',
    cpf: '',
    id: 0
  }

  endereco: Endereco = {
    rua: '',
    numero: '',
    id_municipio: 0,
    id_produtor: 0,
    principal: false,
    id: 0
  }

  endereco_alternativo: Endereco = {
    rua: '',
    numero: '',
    id_municipio: 0,
    id_produtor: 0,
    principal: false,
    id: 0
  }

  propriedades: Propriedade[]
  rebanhos: Rebanho[]
  vendas: Venda[]
  compras: Venda[]

  endereco_alternativo_display: HTMLElement

  constructor(
    private router: Router,
    private activated_route: ActivatedRoute,
    private produtor_service: ProdutorService,
    private propriedade_service: PropriedadeService,
    private rebanho_service: RebanhoService,
    private venda_service: VendaService,
  ) { }

  ngOnInit(): void {
    this.endereco_alternativo_display = document.getElementById('endereco-alternativo')
    this.produtor.id = Number(this.activated_route.snapshot.paramMap.get('id'))
    this.loadProdutor()
    this.produtor_service.getEnderecoByIdProdutor(this.produtor.id).subscribe(response => {
      if (response.length === 1) {
        this.endereco = response[0]
      } else {
        this.endereco_alternativo_display.classList.toggle('hidden')
        response.forEach(endereco => {
          if (endereco.principal === true) this.endereco = endereco
          else this.endereco_alternativo = endereco
        })
      }
    })
    this.propriedade_service.getByIdProdutor(this.produtor.id).subscribe(response => this.propriedades = response)
    this.rebanho_service.getByIdProdutor(this.produtor.id).then(response => this.rebanhos = response)
    this.venda_service.getByIdProdutor(this.produtor.id).then(response => this.vendas = response)
    this.venda_service.getComprasByIdProdutor(this.produtor.id).then(response => this.compras = response)

  }

  loadProdutor() {
    this.produtor_service.getById(this.produtor.id).subscribe(response => this.produtor = response)
  }

}
