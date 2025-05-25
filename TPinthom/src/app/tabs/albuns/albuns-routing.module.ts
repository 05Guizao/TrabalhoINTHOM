import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbunsPage } from './albuns.page';

const routes: Routes = [
  {
    path: '',
    component: AlbunsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbunsPageRoutingModule {}
