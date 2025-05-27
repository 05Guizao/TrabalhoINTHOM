import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'fotografias',
        loadChildren: () => import('./fotografias/fotografias.module').then(m => m.FotografiasPageModule)
      },
      {
        path: 'albuns',
        loadChildren: () => import('./albuns/albuns.module').then(m => m.AlbunsPageModule)
      },
      {
        path: 'pesquisar',
        loadChildren: () => import('./pesquisar/pesquisar.module').then(m => m.PesquisarPageModule)
      },
      {
        path: '',
        redirectTo: 'fotografias',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
