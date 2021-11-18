import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validations } from 'src/app/directives/validations';
import { Municipio } from 'src/app/models/municipio.model';
import { Produtor } from 'src/app/models/produtor.model';
import { Propriedade } from 'src/app/models/propriedade.model';
import { MunicipioService } from 'src/app/services/municipio.service';
import { ProdutorService } from 'src/app/services/produtor.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-propriedade-create',
  templateUrl: './propriedade-create.component.html',
  styleUrls: ['./propriedade-create.component.css']
})
export class PropriedadeCreateComponent implements OnInit {

  search_produtor_input: string = ''
  search_submited: boolean = false
  produtor_validate: boolean = false
  produtor: Produtor
  submited: boolean = false
  propriedade_form: FormGroup
  propriedade: Propriedade
  municipios: Municipio[] = []

  constructor(
    private router: Router,
    private produtor_service: ProdutorService,
    private form_builder: FormBuilder,
    private propriedade_service: PropriedadeService,
    private municipio_service: MunicipioService,
    private shared_service: SharedService,
  ) { }

  ngOnInit(): void {
    this.propriedade_form = this.form_builder.group({
      nome: ['', Validators.compose([Validators.required])],
      inscricao_estadual: ['', Validators.compose([Validators.required, Validations.ValidaNumero])],
      municipio: ['', Validators.compose([Validators.required])]
    })

    this.municipio_service.getAll().subscribe(response => this.municipios = response)
  }

  submit(): void {
    this.submited = true
    if (!this.propriedade_form.valid) return
    this.propriedade = {
      nome: this.propriedade_form.value.nome,
      inscricao_estadual: this.propriedade_form.value.inscricao_estadual,
      id_municipio: this.propriedade_form.value.municipio,
      id_produtor: this.produtor.id
    }
    this.propriedade_service.post(this.propriedade).subscribe(response => {
      this.router.navigate(['propriedade'])
      this.shared_service.showMessage(JSON.stringify(response))
    })
  }

  searchProdutor(): void {
    if (!this.search_produtor_input.trim()) {
      this.search_submited = true
      setTimeout(() => this.search_submited = false, 1600)
      return
    }
    const span_name = document.getElementById('span-name')
    span_name.innerHTML = ''
    this.produtor_service.getByCpf(this.search_produtor_input).subscribe(response => {
      if (response[0]) {
        this.produtor_validate = true
        this.produtor = response[0]
        span_name.innerHTML = `Nome: ${JSON.stringify(response[0].nome)}`
        span_name.classList.remove('delete')
        span_name.classList.add('add')
        
      } else {
        this.produtor_validate = false
        span_name.innerHTML = 'not found'
        span_name.classList.remove('add')
        span_name.classList.add('delete')
      }
    })
  }

  cancel(): void {
    this.router.navigate(['propriedade'])
  }

}
