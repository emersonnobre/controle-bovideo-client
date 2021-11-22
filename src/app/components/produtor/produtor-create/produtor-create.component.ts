import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validations } from 'src/app/directives/validations';
import { Endereco } from 'src/app/models/endereco.model';
import { Municipio } from 'src/app/models/municipio.model';
import { Produtor } from 'src/app/models/produtor.model';
import { MunicipioService } from 'src/app/services/municipio.service';
import { ProdutorService } from 'src/app/services/produtor.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-produtor-create',
  templateUrl: './produtor-create.component.html',
  styleUrls: ['./produtor-create.component.css']
})
export class ProdutorCreateComponent implements OnInit {

  municipios: Municipio[]
  address_alt_form: FormGroup
  address_alt_validate: boolean = false
  produtor_form: FormGroup
  submited: boolean = false
  submited_alt: boolean = false
  novo_produtor: Produtor
  novo_endereco: Endereco
  novo_endereco_alt: Endereco

  constructor(
    private router: Router,
    private produtor_service: ProdutorService,
    private shared_service: SharedService,
    private municipio_service: MunicipioService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.produtor_form = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validations.ValidaCpf])],
      rua: ['', Validators.required],
      numero: ['', Validators.compose([Validators.required, Validations.ValidaNumero])],
      municipio: ['', Validators.required]
    })

    this.address_alt_form = this.formBuilder.group({
      rua_alt: ['', Validators.required],
      numero_alt: ['', Validators.compose([Validators.required, Validations.ValidaNumero])],
      municipio_alt: ['', Validators.required]
    })

    this.municipio_service.getAll().subscribe(response => this.municipios = response)
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
    this.submited_alt = true
    if (!this.address_alt_form.valid) return
    this.address_alt_validate = true
    let formDisplay = document.getElementById('endereco-opcional').classList
    let badge_notification = document.getElementById('address-optional-added').classList
    let button_cancel = document.getElementById('cancel-address').classList
    let button_delete = document.getElementById('delete-address').classList
    formDisplay.toggle('hidden')
    badge_notification.toggle('hidden')
    button_cancel.add('hidden')
    button_delete.toggle('hidden')
  }

  deleteAlternativeAddress(): void {
    this.address_alt_validate = false
    let badge_notification = document.getElementById('address-optional-added').classList
    let button_delete = document.getElementById('delete-address').classList
    let button_add = document.getElementById('add-address').classList
    badge_notification.toggle('hidden')
    button_delete.toggle('hidden')
    button_add.toggle('hidden')
  }

  submit(): void {
    this.submited = true
    if (!this.produtor_form.valid) return
    const produtor_data = this.produtor_form.value
    this.novo_produtor = {
      nome: produtor_data.nome,
      cpf: produtor_data.cpf
    }
    this.novo_endereco = {
      rua: produtor_data.rua,
      numero: produtor_data.numero,
      id_municipio: produtor_data.municipio,
      id_produtor: 1,
      principal: true
    }
    this.produtor_service.post(this.novo_produtor).subscribe(response => {
      this.novo_endereco.id_produtor = response.id
      this.produtor_service.postEndereco(this.novo_endereco).subscribe(response => {
        this.router.navigate(['produtor'])
        this.shared_service.showMessage(JSON.stringify(response))
      })
      if (this.address_alt_validate) {
        const endereco_alt_data = this.address_alt_form.value
        this.novo_endereco_alt = {
          rua: endereco_alt_data.rua_alt,
          numero: endereco_alt_data.numero_alt,
          id_municipio: endereco_alt_data.municipio_alt,
          id_produtor: this.novo_endereco.id_produtor,
          principal: false
        }
        this.produtor_service.postEndereco(this.novo_endereco_alt).subscribe(console.log)
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/produtor'])
  }

}
