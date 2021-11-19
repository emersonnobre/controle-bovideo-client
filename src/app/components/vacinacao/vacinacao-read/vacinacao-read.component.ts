import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { VacinacaoService } from 'src/app/services/vacinacao.service';

@Component({
  selector: 'app-vacinacao-read',
  templateUrl: './vacinacao-read.component.html',
  styleUrls: ['./vacinacao-read.component.css']
})
export class VacinacaoReadComponent implements OnInit {

  displayed_columns = ['data_vacina', 'quantidade', 'id_especie', 'id_propriedade', 'actions']
  data_source = []

  constructor(
    private router: Router,
    private vacinacao_service: VacinacaoService,
    private shared_service: SharedService,
  ) { }

  ngOnInit(): void {
    this.vacinacao_service.getAll().subscribe(response => this.data_source = response)
  }

  redirectToCreate(): void {
    this.router.navigate(['vacinacao/create'])
  }

  redirectToUpdate(id: number): void {
    this.router.navigate([`vacinacao/update/${id}`])
  }

  delete(id: number) {
    this.vacinacao_service.delete(id).subscribe(() => {
      this.shared_service.showMessage('Registro de vacinação deletado')
      setTimeout(() => window.location.reload(), 900)
    })
  }

}
