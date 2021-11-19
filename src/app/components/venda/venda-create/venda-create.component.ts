import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validations } from 'src/app/directives/validations';
import { Especie } from 'src/app/models/especie.model';
import { Propriedade } from 'src/app/models/propriedade.model';
import { Venda } from 'src/app/models/venda.model';
import { EspecieService } from 'src/app/services/especie.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { SharedService } from 'src/app/services/shared.service';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-venda-create',
  templateUrl: './venda-create.component.html',
  styleUrls: ['./venda-create.component.css']
})
export class VendaCreateComponent implements OnInit {

  venda_form: FormGroup
  submited: boolean = false
  current_origem: number = 0

  especies: Especie[]
  propriedades: Propriedade[]
  propriedades_destino:Propriedade[]
  nova_venda: Venda

  constructor(
    private router: Router,
    private especie_service: EspecieService,
    private propriedade_service: PropriedadeService,
    private venda_service: VendaService,
    private shared_service: SharedService,
    private form_builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.venda_form = this.form_builder.group({
      quantidade: ['', Validators.compose([Validators.required, Validations.ValidaNumero])],
      id_especie: ['', Validators.compose([Validators.required,])],
      id_propriedade_origem: ['', Validators.compose([Validators.required,])],
      id_propriedade_destino: ['', Validators.compose([Validators.required,])],
      motivo: ['', Validators.compose([Validators.required,])],
    })
    this.especie_service.getAll().subscribe(response => this.especies = response)
    this.propriedade_service.getAll().subscribe(response => this.propriedades = response)
  }

  submit(): void {
    this.submited = true
    if (!this.venda_form.valid) return 
    const form_data = this.venda_form.value
    this.nova_venda = {
      data_venda: new Date().toISOString(),
      quantidade: form_data.quantidade,
      id_especie: form_data.id_especie,
      id_propriedade_origem: form_data.id_propriedade_origem,
      id_propriedade_destino: form_data.id_propriedade_destino,
      motivo: form_data.motivo
    }
    console.info(this.nova_venda)
    this.venda_service.post(this.nova_venda).subscribe(response => {
      this.router.navigate(['venda'])
      this.shared_service.showMessage(JSON.stringify(response))
    })
  }

  manageSelect(value: any): void {
    console.log(value)
    this.propriedades_destino = this.propriedades.filter(propriedade => propriedade.id != value)
  }

  cancel(): void {
    this.router.navigate(['venda'])
  }

}
