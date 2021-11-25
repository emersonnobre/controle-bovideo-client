import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venda } from 'src/app/models/venda.model';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-venda-info',
  templateUrl: './venda-info.component.html',
  styleUrls: ['./venda-info.component.css']
})
export class VendaInfoComponent implements OnInit {

  venda: any
  propriedade_destino: string

  constructor(
    private router: Router,
    private activated_route: ActivatedRoute,
    private venda_service: VendaService,
    private propriedade_service: PropriedadeService,
  ) { }

  ngOnInit(): void {
    this.loadVenda(Number(this.activated_route.snapshot.paramMap.get('id')))
  }

  loadVenda(id: number):void {
    this.venda_service.getById(id).subscribe(response => {
      this.venda = response[0]
      this.propriedade_service.getById(this.venda.id_propriedade_destino).subscribe(response => this.propriedade_destino = response.nome)
    })
  }

}
