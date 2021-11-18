import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rebanho-read',
  templateUrl: './rebanho-read.component.html',
  styleUrls: ['./rebanho-read.component.css']
})
export class RebanhoReadComponent implements OnInit {

  displayedColumns: string[] = ['especie', 'quantidade', 'propriedade', 'actions']
  dataSource = [
    {
      especie: 'Bovino',
      quantidade: 20000,
      propriedade: 'Recanto dos sabiás'
    },
    {
      especie: 'Bulbalino',
      quantidade: 10000,
      propriedade: 'Recanto dos sabiás'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
