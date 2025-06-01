import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadChildren: () => import('./login/login.module')
      .then(m => m.LoginPageModule) },

  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module')
      .then(m => m.TabsPageModule) },

  { path: 'registo', loadChildren: () => import('./registo/registo.module')
      .then(m => m.RegistoPageModule) },

  { path: 'mapa', loadChildren: () => import('./mapa/mapa.module')
      .then(m => m.MapaPageModule) },

  { path: 'albuns', loadChildren: () => import('./tabs/albuns/albuns.module')
      .then(m => m.AlbunsPageModule) },

  { path: 'fotos-album/:id', loadChildren: () => import('./fotos-album/fotos-album.module')
      .then(m => m.FotosAlbumPageModule) },  {
    path: 'selecionar-fotos',
    loadChildren: () => import('./modals/selecionar-fotos/selecionar-fotos.module').then( m => m.SelecionarFotosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
