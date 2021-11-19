import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EspecieService } from 'src/app/services/especie.service';
import { RebanhoService } from 'src/app/services/rebanho.service';

@Component({
  selector: 'app-rebanho-read',
  templateUrl: './rebanho-read.component.html',
  styleUrls: ['./rebanho-read.component.css']
})
export class RebanhoReadComponent implements OnInit {

  displayedColumns: string[] = ['especie', 'quantidade', 'propriedade', 'actions']
  dataSource = []

  constructor(
    private rebanho_service: RebanhoService,
    private especie_service: EspecieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.rebanho_service.getAll().subscribe(response => this.dataSource = response)
  }

  redirectToCreate(): void {
    this.router.navigate(['rebanho/create'])
  }

}
