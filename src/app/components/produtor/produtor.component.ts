import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtor',
  templateUrl: './produtor.component.html',
  styleUrls: ['./produtor.component.css']
})
export class ProdutorComponent implements OnInit {

  displayedColumns: string[] = ['name', 'cpf']
  dataSource = [
    { name: 'Carlos', cpf: "000" },
    { name: 'Monica', cpf: "000" },
    { name: 'Ricardo', cpf: "000" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
