import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelecionarFotosPage } from './selecionar-fotos.page';

const routes: Routes = [
  {
    path: '',
    component: SelecionarFotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelecionarFotosPageRoutingModule {}
