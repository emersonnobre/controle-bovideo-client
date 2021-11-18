import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-propriedade-read',
  templateUrl: './propriedade-read.component.html',
  styleUrls: ['./propriedade-read.component.css']
})
export class PropriedadeReadComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'inscricao_municipal', 'municipio','actions']
  dataSource = [
    {
      nome: 'Recanto dos sabiás',
      inscricao_municipal: 'teste',
      municipio: 'Nova Andradina'
    }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  redirectToCreate(): void {
    this.router.navigate(['propriedade/create'])
  }

}
