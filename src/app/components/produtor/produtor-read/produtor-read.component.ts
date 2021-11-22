import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { verificaNumero } from 'src/app/directives/utils';
import { Validations } from 'src/app/directives/validations';
import { Produtor } from 'src/app/models/produtor.model';
import { ProdutorService } from 'src/app/services/produtor.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-produtor',
  templateUrl: './produtor-read.component.html',
  styleUrls: ['./produtor-read.component.css']
})
export class ProdutorReadComponent implements OnInit {

  displayedColumns: string[] = ['name', 'cpf', 'actions']
  dataSource = []

  produtor: Produtor = {
    nome: '',
    cpf: ''
  }

  constructor(
    private router: Router,
    private produtor_service: ProdutorService,
    private shared_service: SharedService,
    ) { }

  ngOnInit(): void {
    this.produtor_service.getAll().subscribe(response => this.dataSource = response)
  }

  redirectToCreate(): void {
    this.router.navigate(['produtor/create'])
  }

  redirectToUpdate(id: number): void {
    this.router.navigate([`produtor/update/${id}`])
  }

  redirectToInfo(id: number): void {
    this.router.navigate([`produtor/info/${id}`])
  }

  delete(id: number) {
    this.produtor_service.delete(id).subscribe(() => {
      this.shared_service.showMessage('Produtor deletado')
      setTimeout(() => window.location.reload(), 900)
    })
  }

  searchProdutor(): void {
    if (this.produtor.cpf.length === 0 || this.produtor.cpf.length < 11) {
      return this.shared_service.showMessage('Informe o CPF completo', true)
    } 
    if (!verificaNumero(Array.from(this.produtor.cpf))) return this.shared_service.showMessage('Somente números', true)
    this.produtor_service.getByCpf(this.produtor.cpf).subscribe(response => {
      if (response[0]) {
        this.dataSource = [response[0]]
      } else {
        this.shared_service.showMessage('Nenhum produtor encontrado', true)
        this.produtor_service.getAll().subscribe(response => this.dataSource = response)
      }
    })
  }

}
