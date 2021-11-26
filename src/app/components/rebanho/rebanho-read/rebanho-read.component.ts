import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EspecieService } from 'src/app/services/especie.service';
import { RebanhoService } from 'src/app/services/rebanho.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-rebanho-read',
  templateUrl: './rebanho-read.component.html',
  styleUrls: ['./rebanho-read.component.css']
})
export class RebanhoReadComponent implements OnInit {

  displayedColumns: string[] = ['especie', 'quantidade', 'propriedade']
  dataSource = []

  constructor(
    private rebanho_service: RebanhoService,
    private shared_service: SharedService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.rebanho_service.getAll().subscribe(response => this.dataSource = response.filter(rebanho => rebanho.quantidade > 0))
  }

  redirectToCreate(): void {
    this.router.navigate(['rebanho/create'])
  }

  redirectToInfo(id: number): void {
    this.router.navigate([`rebanho/info/${id}`])
  }
  
  delete(id: number) {
    this.rebanho_service.delete(id).subscribe(() => {
      this.shared_service.showMessage('Entrada cancelada')
      setTimeout(() => window.location.reload(), 900)
    })
  }

  visualizar(tipo_visuzalizao: string): void {
    if (tipo_visuzalizao === 'todos') {
      this.displayedColumns = ['especie', 'quantidade', 'propriedade']
      this.rebanho_service.getAll().subscribe(response => this.dataSource = response.filter(rebanho => rebanho.quantidade > 0))
      return
    }
    if (tipo_visuzalizao === 'entradas') {
      this.displayedColumns = ['especie', 'quantidade', 'propriedade', 'data', 'actions']
      this.rebanho_service.getAllEntradas().subscribe(response => this.dataSource = response.filter(rebanho => rebanho.quantidade > 0))
      return
    }
    if (tipo_visuzalizao === 'vacinados') {
      this.displayedColumns = ['especie', 'quantidade', 'propriedade', 'vacina']
      this.rebanho_service.getAllVacinados().subscribe(response => this.dataSource = response.filter(rebanho => rebanho.quantidade > 0))
    }
  }

}
