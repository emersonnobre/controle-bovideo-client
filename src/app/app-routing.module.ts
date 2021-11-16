import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutorComponent } from './components/produtor/produtor.component';

const routes: Routes = [
  { path: "produtor", component: ProdutorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
