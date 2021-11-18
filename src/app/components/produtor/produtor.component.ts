import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtor',
  templateUrl: './produtor.component.html',
  styleUrls: ['./produtor.component.css']
})
export class ProdutorComponent implements OnInit {

  displayedColumns: string[] = ['name', 'cpf', 'actions']
  dataSource = [
    { name: 'Carlos', cpf: "000" },
    { name: 'Monica', cpf: "000" },
    { name: 'Ricardo', cpf: "000" },
  ]

  constructor(
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  redirectToCreate(): void {
    this.router.navigate(['produtor/create'])
  }

}
