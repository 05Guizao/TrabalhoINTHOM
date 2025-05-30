import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// IMPORTA O MÓDULO DA MODAL
import { SelecionarFotosPageModule } from './modals/selecionar-fotos/selecionar-fotos.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SelecionarFotosPageModule // aqui está o módulo correto
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
