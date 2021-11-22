import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venda } from 'src/app/models/venda.model';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-venda-info',
  templateUrl: './venda-info.component.html',
  styleUrls: ['./venda-info.component.css']
})
export class VendaInfoComponent implements OnInit {

  venda: Venda = {
    data_venda: '',
    quantidade: 0,
    id_especie: 0,
    id_propriedade_destino: 0,
    id_propriedade_origem: 0,
    motivo: '',
    id: 0
  }

  constructor(
    private router: Router,
    private activated_route: ActivatedRoute,
    private venda_service: VendaService,
  ) { }

  ngOnInit(): void {
    this.venda.id = Number(this.activated_route.snapshot.paramMap.get('id'))
    this.loadVenda()
  }

  loadVenda():void {
    this.venda_service.getById(this.venda.id).subscribe(response => this.venda = response)
  }

}
