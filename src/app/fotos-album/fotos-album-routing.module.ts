import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotosAlbumPage } from './fotos-album.page';

const routes: Routes = [
  {
    path: '',
    component: FotosAlbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotosAlbumPageRoutingModule {}
