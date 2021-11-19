import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-venda-read',
  templateUrl: './venda-read.component.html',
  styleUrls: ['./venda-read.component.css']
})
export class VendaReadComponent implements OnInit {

  displayed_columns = ['data_venda', 'quantidade', 'id_especie', 'id_propriedade_destino', 'actions']
  data_source = []

  constructor(
    private router: Router,
    private venda_service: VendaService,
    private shared_service: SharedService,
  ) { }

  ngOnInit(): void {
    this.venda_service.getAll().subscribe(response => this.data_source = response)
  }

  redirectToCreate(): void {
    this.router.navigate(['venda/create'])
  }

  redirectToUpdate(id: number): void {
    this.router.navigate([`venda/update/${id}`])
  }

  delete(id: number) {
    this.venda_service.delete(id).subscribe(() => {
      this.shared_service.showMessage('Registro de venda deletado')
      setTimeout(() => window.location.reload(), 900)
    })
  }

}
