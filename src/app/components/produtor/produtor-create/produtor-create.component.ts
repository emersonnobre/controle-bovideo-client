import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validations } from 'src/app/directives/validations';
import { Endereco } from 'src/app/models/endereco.model';
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
  novoProdutor: Produtor
  novoEndereco: Endereco

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
    const produtor_data = this.produtorForm.value
    this.novoProdutor = {
      nome: produtor_data.nome,
      cpf: produtor_data.cpf
    }
    this.novoEndereco = {
      rua: produtor_data.rua,
      numero: produtor_data.numero,
      id_municipio: produtor_data.municipio,
      id_produtor: 1
    }

    console.log('Produtor: ', this.novoProdutor)
    console.log('Endereço: ', this.novoEndereco)
  }

  cancel(): void {
    this.router.navigate(['/produtor'])
  }

}
