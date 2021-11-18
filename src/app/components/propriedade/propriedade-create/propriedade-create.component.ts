import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validations } from 'src/app/directives/validations';
import { ProdutorService } from 'src/app/services/produtor.service';

@Component({
  selector: 'app-propriedade-create',
  templateUrl: './propriedade-create.component.html',
  styleUrls: ['./propriedade-create.component.css']
})
export class PropriedadeCreateComponent implements OnInit {

  search_produtor_input: string = ''
  search_submited: boolean = false
  produtor_validate: boolean = false
  submited: boolean = false
  propriedade_form: FormGroup

  constructor(
    private router: Router,
    private produtor_service: ProdutorService,
    private form_builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.propriedade_form = this.form_builder.group({
      nome: ['', Validators.compose([Validators.required])],
      inscricao_municipal: ['', Validators.compose([Validators.required, Validations.ValidaNumero])],
      municipio: ['', Validators.compose([Validators.required])]
    })
  }

  submit(): void {
    this.submited = true
    if (!this.propriedade_form.valid) return
    console.info(this.propriedade_form.value)
  }

  searchProdutor(): void {
    if (!this.search_produtor_input.trim()) {
      this.search_submited = true
      setTimeout(() => this.search_submited = false, 1600)
      return
    }
    const result = this.produtor_service.getByCpf(this.search_produtor_input)
    const span_name = document.getElementById('span-name')
    span_name.innerHTML = ''
    if (result) {
      this.produtor_validate = true
      span_name.innerHTML = JSON.stringify(result)
      span_name.classList.remove('delete')
      span_name.classList.add('add')
      
    } else {
      this.produtor_validate = false
      span_name.innerHTML = 'not found'
      span_name.classList.remove('add')
      span_name.classList.add('delete')
    }
  }

  cancel(): void {
    this.router.navigate(['propriedade'])
  }

}
