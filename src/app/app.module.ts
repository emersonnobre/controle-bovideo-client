// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'

// Components
import { AppComponent } from './app.component';
import { NavComponent } from './components/templates/nav/nav.component';
import { ProdutorComponent } from './components/produtor/produtor.component';
import { PropriedadeReadComponent } from './components/propriedade/propriedade-read/propriedade-read.component';
import { RebanhoReadComponent } from './components/rebanho/rebanho-read/rebanho-read.component';
import { ProdutorCreateComponent } from './components/produtor/produtor-create/produtor-create.component';
import { RebanhoCreateComponent } from './components/rebanho/rebanho-create/rebanho-create.component';
import { RebanhoUpdateComponent } from './components/rebanho/rebanho-update/rebanho-update.component';
import { PropriedadeCreateComponent } from './components/propriedade/propriedade-create/propriedade-create.component';
import { PropriedadeUpdateComponent } from './components/propriedade/propriedade-update/propriedade-update.component';
import { ProdutorUpdateComponent } from './components/produtor/produtor-update/produtor-update.component';
import { VacinacaoReadComponent } from './components/vacinacao/vacinacao-read/vacinacao-read.component';
import { VacinacaoCreateComponent } from './components/vacinacao/vacinacao-create/vacinacao-create.component';
import { VacinacaoUpdateComponent } from './components/vacinacao/vacinacao-update/vacinacao-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProdutorComponent,
    PropriedadeReadComponent,
    RebanhoReadComponent,
    ProdutorCreateComponent,
    RebanhoCreateComponent,
    RebanhoUpdateComponent,
    PropriedadeCreateComponent,
    PropriedadeUpdateComponent,
    ProdutorUpdateComponent,
    VacinacaoReadComponent,
    VacinacaoCreateComponent,
    VacinacaoUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
