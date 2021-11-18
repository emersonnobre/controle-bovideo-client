import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validations } from 'src/app/directives/validations';
import { Produtor } from 'src/app/models/produtor.model';

@Component({
  selector: 'app-produtor-create',
  templateUrl: './produtor-create.component.html',
  styleUrls: ['./produtor-create.component.css']
})
export class ProdutorCreateComponent implements OnInit {

  addressAltForm: FormGroup
  produtorForm: FormGroup
  submited: boolean = false
  submitedAlt: boolean = false
  produtor: Produtor = {
    nome: '',
    cpf: ''
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.produtorForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validations.ValidaCpf])],
      rua: ['', Validators.required],
      numero: ['', Validators.compose([Validators.required, Validations.ValidaNumero])],
      municipio: ['', Validators.required]
    })

    this.addressAltForm = this.formBuilder.group({
      rua_alt: ['', Validators.required],
      numero_alt: ['', Validators.compose([Validators.required, Validations.ValidaNumero])],
      municipio_alt: ['', Validators.required]
    })
  }

  toggleAltAddress(): void {
    let formDisplay = document.getElementById('endereco-opcional').classList
    let buttonAdd = document.getElementById('add-address').classList
    let buttonCancel = document.getElementById('cancel-address').classList
    if (formDisplay.contains('hidden')) {
      formDisplay.toggle('hidden')
      buttonAdd.toggle('hidden')
      buttonCancel.toggle('hidden')
    } else {
      formDisplay.toggle('hidden', true)
      buttonAdd.toggle('hidden')
      buttonCancel.toggle('hidden')
    }
  }

  submitAlternativeAddress(): void {
    this.submitedAlt = true
    if (!this.addressAltForm.valid) return
  }

  submit(): void {
    this.submited = true
    if (!this.produtorForm.valid) return
  }

  cancel(): void {
    this.router.navigate(['/produtor'])
  }

  getErrorMessage(form: FormGroup, campo: string) {
    if (form.controls[campo].hasError('required')) {
      return 'Este campo não pode ser vazio';
    }
    return 'Valor inválido para este campo';
  }

}
