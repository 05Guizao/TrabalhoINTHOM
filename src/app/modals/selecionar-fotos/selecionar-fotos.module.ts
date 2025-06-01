import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelecionarFotosPageRoutingModule } from './selecionar-fotos-routing.module';

import { SelecionarFotosPage } from './selecionar-fotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelecionarFotosPageRoutingModule
  ],
  declarations: [SelecionarFotosPage]
})
export class SelecionarFotosPageModule {}
