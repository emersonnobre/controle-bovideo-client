import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutorService } from 'src/app/services/produtor.service';

@Component({
  selector: 'app-produtor',
  templateUrl: './produtor-read.component.html',
  styleUrls: ['./produtor-read.component.css']
})
export class ProdutorReadComponent implements OnInit {

  displayedColumns: string[] = ['name', 'cpf', 'actions']
  dataSource = []

  constructor(
    private router: Router,
    private produtor_service: ProdutorService,
    ) { }

  ngOnInit(): void {
    this.produtor_service.getAll().subscribe(response => this.dataSource = response)
  }

  redirectToCreate(): void {
    this.router.navigate(['produtor/create'])
  }

}
