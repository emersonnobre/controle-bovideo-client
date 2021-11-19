import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  delete(id: number) {
    this.produtor_service.delete(id).subscribe(() => {
      this.shared_service.showMessage('Produtor deletado')
      setTimeout(() => window.location.reload(), 900)
    })
  }

}
