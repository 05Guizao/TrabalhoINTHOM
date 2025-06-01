import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbunsPageRoutingModule } from './albuns-routing.module';

import { AlbunsPage } from './albuns.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbunsPageRoutingModule
  ],
  declarations: [AlbunsPage]
})
export class AlbunsPageModule {}
