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
  tinha_endereco_alternativo: boolean = false

  novo_produtor: Produtor
  novo_endereco: Endereco
  novo_endereco_alt: Endereco
  municipios: Municipio[]
  id_produtor: number
  id_endereco: number
  id_endereco_alternativo: number
  id_municipio: number = 1

  badge_notification:HTMLElement
  form_display: HTMLElement
  button_add: HTMLElement
  button_cancel: HTMLElement
  button_delete: HTMLElement

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
    this.button_add = document.getElementById('add-address')
    this.button_cancel = document.getElementById('cancel-address')
    this.button_delete = document.getElementById('delete-address')


    this.id_produtor = Number(this.activated_route.snapshot.paramMap.get('id'))

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
    this.produtor_service.getById(this.id_produtor).subscribe(response => {
      this.produtor_form.patchValue({
        nome: response.nome,
        cpf: response.cpf
      })
    })
    this.produtor_service.getEnderecoByIdProdutor(this.id_produtor).subscribe(response => {
      if (response.length == 0) return
      else if (response.length == 1) {
        this.tinha_endereco_alternativo = false
        this.id_endereco = response[0].id
        this.produtor_form.patchValue({
          rua: response[0].rua,
          numero: response[0].numero
        })
        this.produtor_form.get('municipio').setValue(response[0].id_municipio)
      } else {
        this.tinha_endereco_alternativo = true
        this.form_display.classList.toggle('hidden')
        this.button_add.classList.toggle('hidden')
        this.button_cancel.classList.toggle('hidden')

        response.forEach(endereco => {
          if (endereco.principal === true) {
            this.id_endereco = endereco.id
            this.produtor_form.patchValue({
              rua: endereco.rua,
              numero: endereco.numero,
              municipio: 1
            })
          } else {
            this.id_endereco_alternativo = endereco.id
            this.address_alt_form.patchValue({
              rua_alt: endereco.rua,
              numero_alt: endereco.numero,
              municipio_alt: endereco.id_municipio
            })
          }
        })
      }
    })
  }

  toggleAlternativeAddress(): void {
    this.form_display.classList.toggle('hidden')
    this.button_add.classList.toggle('hidden')
    this.button_cancel.classList.toggle('hidden')

  }

  submitAlternativeAddress(): void {
    this.submited_alt = true
    if (!this.address_alt_form.valid) return
    this.address_alt_validate = true
    this.form_display.classList.toggle('hidden')
    this.badge_notification.classList.toggle('hidden')
    this.button_cancel.classList.toggle('hidden')
    this.button_delete.classList.toggle('hidden')
  }

  deleteAlternativeAddress(): void {
    this.address_alt_validate = false
    this.badge_notification.classList.toggle('hidden')
    this.button_delete.classList.toggle('hidden')
    this.button_add.classList.toggle('hidden')
  }

  submit(): void {
    this.submited = true
    if (!this.produtor_form.valid) return
    if (!this.form_display.classList.contains('hidden') && !this.address_alt_validate) return 
    const produtor_data = this.produtor_form.value
    const endereco_alt_data = this.address_alt_form.value
    // Colacando os valores dos formulários dentro das models
    this.novo_produtor = {
      id: this.id_produtor,
      nome: produtor_data.nome,
      cpf: produtor_data.cpf
    }
    this.novo_endereco = {
      id: this.id_endereco,
      rua: produtor_data.rua,
      numero: produtor_data.numero,
      id_municipio: produtor_data.municipio,
      id_produtor: this.id_produtor,
      principal: true
    }
    this.novo_endereco_alt = {
      id: this.id_endereco_alternativo,
      rua: endereco_alt_data.rua_alt,
      numero: endereco_alt_data.numero_alt,
      id_municipio: endereco_alt_data.municipio_alt,
      id_produtor: this.id_produtor,
      principal: false
    }
    this.produtor_service.put(this.novo_produtor).subscribe(() => {
      this.produtor_service.putEndereco(this.novo_endereco).subscribe(() => {
        if (this.tinha_endereco_alternativo) {
          if (!this.address_alt_validate) {
            this.produtor_service.deleteEndereco(this.novo_endereco_alt.id).subscribe(console.info)
          } else {
            this.produtor_service.putEndereco(this.novo_endereco_alt).subscribe(console.info)
          }
        } else {
          if (this.address_alt_validate) {
            this.produtor_service.postEndereco(this.novo_endereco_alt).subscribe(console.info)
          }
        }
        this.router.navigate(['produtor'])
        this.shared_service.showMessage('Produtor atualizado')
      })
    })

  }

  cancel(): void {
    this.router.navigate(['/produtor'])
  }

}
