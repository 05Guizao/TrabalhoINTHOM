import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AlbumService, AlbumCard } from '../../services/album.service';

@Component({
  selector: 'app-albuns',
  templateUrl: './albuns.page.html',
  styleUrls: ['./albuns.page.scss'],
  standalone: false,
})
export class AlbunsPage implements OnInit {

  albums: AlbumCard[] = [];

  constructor(
    private albumSvc: AlbumService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.syncAlbums();
  }

  private async syncAlbums() {
    this.albums = await this.albumSvc.list();
  }

  /** ---------- NOVO ---------- */
  async criarAlbum() {
  const alert = await this.alertCtrl.create({
    header: 'Novo Álbum',
    inputs: [
      { name: 'titulo', type: 'text', placeholder: 'Título', attributes: { maxlength: 50 } },
      { name: 'descricao', type: 'textarea', placeholder: 'Descrição (opcional)' }
    ],
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Criar',
        handler: async (data) => {
          const titulo = data.titulo?.trim();
          if (!titulo) return false;          // mantém alerta aberto

          await this.albumSvc.create(titulo, data.descricao?.trim() || '');
          await this.syncAlbums();            // refresca lista
          return true;                        // fecha o alerta
        }
      }
    ]
  });

  await alert.present();
  }


  openAlbum(id: string) {
    this.navCtrl.navigateForward(`/fotos-album/${id}`);
  }
  
  async confirmarApagar(id: string) {
  const alert = await this.alertCtrl.create({
    header: 'Apagar Álbum',
    message: 'Tens a certeza que queres apagar este álbum?',
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Apagar',
        handler: async () => {
          await this.albumSvc.apagar(id);
          await this.syncAlbums();
        }
      }
    ]
  });

  await alert.present();
}


}
