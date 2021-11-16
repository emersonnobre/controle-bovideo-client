// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

// Components
import { AppComponent } from './app.component';
import { NavComponent } from './components/templates/nav/nav.component';
import { ProdutorComponent } from './components/produtor/produtor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProdutorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
