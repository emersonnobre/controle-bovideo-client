import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validations } from 'src/app/directives/validations';
import { Endereco } from 'src/app/models/endereco.model';
import { Municipio } from 'src/app/models/municipio.model';
import { Produtor } from 'src/app/models/produtor.model';
import { MunicipioService } from 'src/app/services/municipio.service';
import { ProdutorService } from 'src/app/services/produtor.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-produtor-update',
  templateUrl: './produtor-update.component.html',
  styleUrls: ['./produtor-update.component.css']
})
export class ProdutorUpdateComponent implements OnInit {

  produtor_form: FormGroup
  address_alt_form: FormGroup
  submited: boolean = false
  submited_alt: boolean = false
  address_alt_validate: boolean = false

  novo_produtor: Produtor
  novo_endereco: Endereco
  novo_endereco_alt: Endereco
  municipios: Municipio[]

  badge_notification:HTMLElement
  form_display: HTMLElement

  constructor(
    private router: Router,
    private activated_route: ActivatedRoute,
    private produtor_service: ProdutorService,
    private municipio_service: MunicipioService,
    private shared_service: SharedService,
    private form_builder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.badge_notification = document.getElementById('address-optional-added')
    this.form_display = document.getElementById('endereco-opcional')


    const id_produtor = Number(this.activated_route.snapshot.paramMap.get('id'))
    this.produtor_form = this.form_builder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validations.ValidaCpf])],
      rua: ['', Validators.required],
      numero: ['', Validators.compose([Validators.required, Validations.ValidaNumero])],
      municipio: ['', Validators.required]
    })

    this.address_alt_form = this.form_builder.group({
      rua_alt: ['', Validators.required],
      numero_alt: ['', Validators.compose([Validators.required, Validations.ValidaNumero])],
      municipio_alt: ['', Validators.required]
    })

    this.municipio_service.getAll().subscribe(response => this.municipios = response)

    /* Carregando os valores obtidos na API do produtor*/
    this.produtor_service.getById(id_produtor).subscribe(response => {
      this.produtor_form.patchValue({
        nome: response.nome,
        cpf: response.cpf
      })
    })
    this.produtor_service.getEnderecoByIdProdutor(id_produtor).subscribe(response => {
      if (response.length == 0) return
      else if (response.length == 1) {
        this.produtor_form.patchValue({
          rua: response[0].rua,
          numero: response[0].numero,
          municipio: response[0].id_municipio
        })
      } else {
        this.address_alt_validate = true
        this.badge_notification.classList.toggle('hidden')
        this.produtor_form.patchValue({
          rua: response[0].rua,
          numero: response[0].numero,
          municipio: response[0].id_municipio
        })
        this.address_alt_form.patchValue({
          rua_alt: response[1].rua,
          numero_alt: response[1].numero,
          municipio_alt: response[1].id_municipio
        })
      }
    })
  }

  toggleAltAddress(): void {
    let buttonAdd = document.getElementById('add-address').classList
    let buttonCancel = document.getElementById('cancel-address').classList
    if (this.form_display.classList.contains('hidden')) {
      this.form_display.classList.toggle('hidden')
      buttonAdd.toggle('hidden')
      buttonCancel.toggle('hidden')
    } else {
      this.form_display.classList.toggle('hidden', true)
      buttonAdd.toggle('hidden')
      buttonCancel.toggle('hidden')
    }
  }

  submitAlternativeAddress(): void {
    this.submited_alt = true
    if (!this.address_alt_form.valid) return
    this.address_alt_validate = true
    let button_cancel = document.getElementById('cancel-address').classList
    let button_delete = document.getElementById('delete-address').classList
    this.form_display.classList.toggle('hidden')
    this.badge_notification.classList.toggle('hidden')
    button_cancel.add('hidden')
    button_delete.toggle('hidden')
  }

  deleteAlternativeAddress(): void {
    this.address_alt_validate = false
    let button_delete = document.getElementById('delete-address').classList
    let button_add = document.getElementById('add-address').classList
    this.badge_notification.classList.toggle('hidden')
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
      id_produtor: 1
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
          id_produtor: this.novo_endereco.id_produtor
        }
        this.produtor_service.postEndereco(this.novo_endereco_alt).subscribe(console.log)
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/produtor'])
  }

}
