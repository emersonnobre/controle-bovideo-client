import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutorCreateComponent } from './components/produtor/produtor-create/produtor-create.component';
import { ProdutorUpdateComponent } from './components/produtor/produtor-update/produtor-update.component';
import { ProdutorComponent } from './components/produtor/produtor.component';
import { PropriedadeCreateComponent } from './components/propriedade/propriedade-create/propriedade-create.component';
import { PropriedadeReadComponent } from './components/propriedade/propriedade-read/propriedade-read.component';
import { PropriedadeUpdateComponent } from './components/propriedade/propriedade-update/propriedade-update.component';
import { RebanhoCreateComponent } from './components/rebanho/rebanho-create/rebanho-create.component';
import { RebanhoReadComponent } from './components/rebanho/rebanho-read/rebanho-read.component';
import { RebanhoUpdateComponent } from './components/rebanho/rebanho-update/rebanho-update.component';
import { VacinacaoCreateComponent } from './components/vacinacao/vacinacao-create/vacinacao-create.component';
import { VacinacaoReadComponent } from './components/vacinacao/vacinacao-read/vacinacao-read.component';
import { VacinacaoUpdateComponent } from './components/vacinacao/vacinacao-update/vacinacao-update.component';

const routes: Routes = [
  { path: "produtor", component: ProdutorComponent },
  { path: "produtor/create", component: ProdutorCreateComponent },
  { path: "produtor/update/:id", component: ProdutorUpdateComponent },
  { path: "propriedade", component: PropriedadeReadComponent },
  { path: "propriedade/create", component: PropriedadeCreateComponent },
  { path: "propriedade/update/:id", component: PropriedadeUpdateComponent },
  { path: "rebanho", component: RebanhoReadComponent },
  { path: "rebanho/create", component: RebanhoCreateComponent },
  { path: "rebanho/update/:id", component: RebanhoUpdateComponent },
  { path: "vacinacao", component: VacinacaoReadComponent },
  { path: "vacinacao/create", component: VacinacaoCreateComponent },
  { path: "vacinacao/update/:id", component: VacinacaoUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
