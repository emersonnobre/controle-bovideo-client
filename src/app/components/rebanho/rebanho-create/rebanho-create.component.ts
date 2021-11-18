import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validations } from 'src/app/directives/validations';
import { Especie } from 'src/app/models/especie.model';
import { Propriedade } from 'src/app/models/propriedade.model';
import { Rebanho } from 'src/app/models/rebanho.model';
import { EspecieService } from 'src/app/services/especie.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { RebanhoService } from 'src/app/services/rebanho.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-rebanho-create',
  templateUrl: './rebanho-create.component.html',
  styleUrls: ['./rebanho-create.component.css']
})
export class RebanhoCreateComponent implements OnInit {

  rebanhoForm: FormGroup
  submited: boolean = false
  especies: Especie[]
  propriedades: Propriedade[]
  novoRebanho: Rebanho

  constructor(
    private router: Router,
    private rebanho_service: RebanhoService,
    private especie_service: EspecieService,
    private propriedade_service: PropriedadeService,
    private shared_service: SharedService,
    private form_builder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.rebanhoForm = this.form_builder.group({
      quantidade: ['', Validators.compose([Validators.required, Validations.ValidaNumero])],
      especie: ['', Validators.compose([Validators.required])],
      propriedade: ['', Validators.compose([Validators.required])],
    })

    this.especie_service.getAll().subscribe(response => this.especies = response)
    this.propriedade_service.getAll().subscribe(response => this.propriedades = response)
  }

  submit(): void {
    this.submited = true
    if (!this.rebanhoForm.valid) return
    const form = this.rebanhoForm.value
    this.novoRebanho = {
      quantidade: form.quantidade,
      id_especie: form.especie,
      id_propriedade: form.propriedade
    }
    this.rebanho_service.post(this.novoRebanho).subscribe(response => {
      this.router.navigate(['rebanho'])
      this.shared_service.showMessage(JSON.stringify(response))
    })
  }

  cancel(): void {
    this.router.navigate(['rebanho'])
  }

}
