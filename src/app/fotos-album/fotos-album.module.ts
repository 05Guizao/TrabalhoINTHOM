import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotosAlbumPageRoutingModule } from './fotos-album-routing.module';

import { FotosAlbumPage } from './fotos-album.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotosAlbumPageRoutingModule
  ],
  declarations: [FotosAlbumPage]
})
export class FotosAlbumPageModule {}
