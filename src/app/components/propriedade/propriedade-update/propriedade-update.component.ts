import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validations } from 'src/app/directives/validations';
import { Municipio } from 'src/app/models/municipio.model';
import { Produtor } from 'src/app/models/produtor.model';
import { Propriedade } from 'src/app/models/propriedade.model';
import { MunicipioService } from 'src/app/services/municipio.service';
import { ProdutorService } from 'src/app/services/produtor.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-propriedade-update',
  templateUrl: './propriedade-update.component.html',
  styleUrls: ['./propriedade-update.component.css']
})
export class PropriedadeUpdateComponent implements OnInit {

  propriedade_form: FormGroup
  submited: boolean = false
  search_submited: boolean
  search_produtor_input: string
  produtor_validate: boolean = false

  municipios: Municipio[]
  produtor: Produtor
  propriedade: Propriedade = {
    nome: '',
    inscricao_estadual: '',
    id_municipio: 0,
    id_produtor: 0
  }

  span_name: HTMLElement

  constructor(
    private router: Router,
    private activated_route: ActivatedRoute,
    private form_builder: FormBuilder,
    private municipio_service: MunicipioService,
    private produtor_service: ProdutorService,
    private propriedade_service: PropriedadeService,
    private shared_service: SharedService,
  ) { }

  ngOnInit(): void {
    this.propriedade.inscricao_estadual = this.activated_route.snapshot.paramMap.get('id')
    this.span_name = document.getElementById('span-name')

    this.propriedade_form = this.form_builder.group({
      nome: ['', Validators.compose([Validators.required])],
      inscricao_estadual: ['', Validators.compose([Validators.required, Validations.ValidaNumero])],
      municipio: ['', Validators.compose([Validators.required])]
    })

    this.municipio_service.getAll().subscribe(response => this.municipios = response)

    /* Carregando os valores obtidos na API da propriedade */
    this.propriedade_service.getByInscricao(this.propriedade.inscricao_estadual).subscribe(response => {
      this.propriedade_form.patchValue({
        nome: response.nome,
        inscricao_estadual: response.inscricao_estadual,
        municipio: response.id_municipio
      })
      this.produtor_service.getById(response.id_produtor).subscribe(response => {
        console.log(response)
        this.produtor_validate = true
        this.produtor = response
        this.search_produtor_input = response.cpf
        this.span_name.innerHTML = response.nome
        this.span_name.classList.add('add')
      })
    })
  }

  submit(): void {
    this.submited = true
    if (!this.propriedade_form.valid) return
    const form_data = this.propriedade_form.value
    this.propriedade = {
      nome: form_data.nome,
      id_municipio: form_data.municipio,
      inscricao_estadual: form_data.inscricao_estadual,
      id_produtor: this.produtor.id
    }
    this.propriedade_service.put(this.propriedade).subscribe(() => {
      this.shared_service.showMessage('Propriedade atualizada')
      this.router.navigate(['propriedade'])
    })
  }

  searchProdutor(): void {
    if (!this.search_produtor_input.trim()) {
      this.search_submited = true
      setTimeout(() => this.search_submited = false, 1600)
      return
    }
    this.span_name.innerHTML = ''
    this.produtor_service.getByCpf(this.search_produtor_input).subscribe(response => {
      if (response[0]) {
        this.produtor_validate = true
        this.produtor = response[0]
        this.span_name.innerHTML = this.produtor.nome
        this.span_name.classList.remove('delete')
        this.span_name.classList.add('add')
        
      } else {
        this.produtor_validate = false
        this.span_name.innerHTML = 'not found'
        this.span_name.classList.remove('add')
        this.span_name.classList.add('delete')
      }
    })
  }

  cancel(): void {
    this.router.navigate(['propriedade'])
  }

}
