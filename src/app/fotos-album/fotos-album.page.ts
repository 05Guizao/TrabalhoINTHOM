import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { PhotoService, StoredPhoto } from '../services/photo.service';
import { SelecionarFotosPage } from '../modals/selecionar-fotos/selecionar-fotos.page';

@Component({
  selector: 'app-fotos-album',
  templateUrl: './fotos-album.page.html',
  styleUrls: ['./fotos-album.page.scss'],
  standalone: false,
})
export class FotosAlbumPage implements OnInit {

  albumId!: string;
  fotos: StoredPhoto[] = [];
  selectedImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private photosSvc: PhotoService
  ) {}

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id')!;
    this.syncFotos();
  }

  ionViewWillEnter() {
    this.syncFotos();
  }

  private async syncFotos() {
    this.fotos = await this.photosSvc.listInAlbum(this.albumId);
  }

  async abrirSeletor() {
    const modal = await this.modalCtrl.create({
      component: SelecionarFotosPage,
      componentProps: { albumId: this.albumId }
    });

    await modal.present();

    const { data: selecionadas } = await modal.onDidDismiss();
    if (selecionadas?.length) {
      await this.photosSvc.addPhotosToAlbum(this.albumId, selecionadas);
      this.fotos = await this.photosSvc.listInAlbum(this.albumId); // refresca
    }
  }

  openImage(src: string) {
    this.selectedImage = src;
  }

  closeImage() {
    this.selectedImage = null;
  }

  async confirmarApagar(event: Event, photoId: string) {
    event.stopPropagation();

    const alert = await this.alertController.create({
      header: 'Apagar Foto',
      message: 'Tens a certeza que queres apagar esta foto do álbum?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Apagar',
          handler: async () => {
            await this.photosSvc.deletePhotoFromAlbum(this.albumId, photoId);
            this.syncFotos();
          }
        }
      ]
    });

    await alert.present();
  }

  voltar() {
    this.navCtrl.back();
  }

}
