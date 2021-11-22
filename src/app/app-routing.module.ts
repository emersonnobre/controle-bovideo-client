import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutorCreateComponent } from './components/produtor/produtor-create/produtor-create.component';
import { ProdutorUpdateComponent } from './components/produtor/produtor-update/produtor-update.component';
import { ProdutorReadComponent } from './components/produtor/produtor-read/produtor-read.component';
import { PropriedadeCreateComponent } from './components/propriedade/propriedade-create/propriedade-create.component';
import { PropriedadeReadComponent } from './components/propriedade/propriedade-read/propriedade-read.component';
import { PropriedadeUpdateComponent } from './components/propriedade/propriedade-update/propriedade-update.component';
import { RebanhoCreateComponent } from './components/rebanho/rebanho-create/rebanho-create.component';
import { RebanhoReadComponent } from './components/rebanho/rebanho-read/rebanho-read.component';
import { VacinacaoCreateComponent } from './components/vacinacao/vacinacao-create/vacinacao-create.component';
import { VacinacaoReadComponent } from './components/vacinacao/vacinacao-read/vacinacao-read.component';
import { VendaReadComponent } from './components/venda/venda-read/venda-read.component';
import { VendaCreateComponent } from './components/venda/venda-create/venda-create.component';
import { ProdutorInfoComponent } from './components/produtor/produtor-info/produtor-info.component';
import { PropriedadeInfoComponent } from './components/propriedade/propriedade-info/propriedade-info.component';
import { VacinacaoInfoComponent } from './components/vacinacao/vacinacao-info/vacinacao-info.component';
import { VendaInfoComponent } from './components/venda/venda-info/venda-info.component';
import { HomeComponent } from './components/templates/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "produtor", component: ProdutorReadComponent },
  { path: "produtor/create", component: ProdutorCreateComponent },
  { path: "produtor/update/:id", component: ProdutorUpdateComponent },
  { path: "produtor/info/:id", component: ProdutorInfoComponent },  
  { path: "propriedade", component: PropriedadeReadComponent },
  { path: "propriedade/create", component: PropriedadeCreateComponent },
  { path: "propriedade/update/:id", component: PropriedadeUpdateComponent },
  { path: "propriedade/info/:id", component: PropriedadeInfoComponent },  
  { path: "rebanho", component: RebanhoReadComponent },
  { path: "rebanho/create", component: RebanhoCreateComponent },
  { path: "vacinacao", component: VacinacaoReadComponent },
  { path: "vacinacao/create", component: VacinacaoCreateComponent },
  { path: "vacinacao/info/:id", component: VacinacaoInfoComponent },  
  { path: "venda", component: VendaReadComponent },
  { path: "venda/create", component: VendaCreateComponent },
  { path: "venda/info/:id", component: VendaInfoComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
