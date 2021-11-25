import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validations } from 'src/app/directives/validations';
import { Especie } from 'src/app/models/especie.model';
import { Propriedade } from 'src/app/models/propriedade.model';
import { Vacina } from 'src/app/models/vacina.model';
import { Vacinacao } from 'src/app/models/vacinacao.model';
import { EspecieService } from 'src/app/services/especie.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { SharedService } from 'src/app/services/shared.service';
import { VacinacaoService } from 'src/app/services/vacinacao.service';

@Component({
  selector: 'app-vacinacao-create',
  templateUrl: './vacinacao-create.component.html',
  styleUrls: ['./vacinacao-create.component.css']
})
export class VacinacaoCreateComponent implements OnInit {

  vacinacao_form: FormGroup
  submited: boolean = false

  especies: Especie[]
  propriedades: Propriedade[]
  vacinas: Vacina[]
  nova_vacinacao: Vacinacao

  constructor(
    private router: Router,
    private especie_service: EspecieService,
    private propriedade_service: PropriedadeService,
    private vacinacao_service: VacinacaoService,
    private shared_service: SharedService,
    private form_builder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.vacinacao_form = this.form_builder.group({
      quantidade: ['', Validators.compose([Validators.required, Validations.ValidaNumero])],
      id_especie: ['', Validators.compose([Validators.required])],
      id_propriedade: ['', Validators.compose([Validators.required])],
      id_vacina: ['', Validators.compose([Validators.required])],
    })
    this.especie_service.getAll().subscribe(response => this.especies = response)
    this.propriedade_service.getAll().subscribe(response => this.propriedades = response)
    this.vacinacao_service.getAllTipoVacina().subscribe(response => this.vacinas = response)
  }

  submit(): void {
    this.submited = true
    if (!this.vacinacao_form.valid) return
    const form_data = this.vacinacao_form.value
    this.nova_vacinacao = {
      data_vacina: new Date().toISOString(),
      quantidade: form_data.quantidade,
      id_especie: form_data.id_especie,
      id_propriedade: form_data.id_propriedade,
      id_vacina: form_data.id_vacina
    }
    console.log(this.nova_vacinacao)
    this.vacinacao_service.post(this.nova_vacinacao).subscribe(response => {
      this.router.navigate(['vacinacao'])
      this.shared_service.showMessage(response.toString())
    }, err => this.shared_service.showMessage(err.error, true))
  }

  cancel(): void {
    this.router.navigate(['vacinacao'])
  }

}
