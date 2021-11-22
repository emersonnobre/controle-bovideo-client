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

  displayedColumns: string[] = ['especie', 'quantidade', 'propriedade', 'actions']
  dataSource = []

  constructor(
    private rebanho_service: RebanhoService,
    private shared_service: SharedService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.rebanho_service.getAll().subscribe(response => this.dataSource = response)
  }

  redirectToCreate(): void {
    this.router.navigate(['rebanho/create'])
  }

  redirectToInfo(id: number): void {
    this.router.navigate([`rebanho/info/${id}`])
  }
  
  delete(id: number) {
    this.rebanho_service.delete(id).subscribe(() => {
      this.shared_service.showMessage('Rebanho deletado')
      setTimeout(() => window.location.reload(), 900)
    })
  }

}
