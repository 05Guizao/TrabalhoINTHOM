import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoService } from '../../services/photo.service';      // << NOVO

interface GalleryPhoto {
  url: string;   // URL assinado
  path: string;  // caminho real no bucket → para apagar ou reutilizar
}

@Component({
  selector: 'app-fotografias',
  templateUrl: './fotografias.page.html',
  styleUrls: ['./fotografias.page.scss'],
  standalone: false,
})
export class FotografiasPage implements OnInit {

  photos: GalleryPhoto[] = [];          // já não é string[]
  selectedImage: string | null = null;

  isMenuOpen = false;
  popoverEvent: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private photosSvc: PhotoService        
  ) {}

  ngOnInit() {
  this.syncPhotos();   
  }
  ionViewWillEnter() { this.syncPhotos(); }


  /** Vai à BD, traz tudo e preenche o array */
  async syncPhotos() {
    this.photos = await this.photosSvc.list();
  }


  /** Abre a foto em fullscreen */
  openImage(src: string) {
    this.selectedImage = src;
  }

  closeImage() {
    this.selectedImage = null;
  }

  /** Tira da galeria do dispositivo, faz upload, grava meta na BD */
  async adicionarFoto() {
    const image = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    // converte dataUrl → Blob → File
    const res  = await fetch(image.dataUrl!);
    const blob = await res.blob();
    const file = new File([blob], `foto_${Date.now()}.jpeg`, { type: blob.type });

    // guarda na Storage + BD
    const path     = await this.photosSvc.upload(file);
    const signedUrl = await this.photosSvc.signedUrl(path);

    // mete na grelha
    this.photos.push({ url: signedUrl, path });
  }

  /** Confirmação antes de apagar localmente (opcional: podes também apagar do Supabase) */
  async confirmarApagar(event: Event) {
    event.stopPropagation();
    const alert = await this.alertController.create({
      header: 'Apagar Fotografia',
      message: 'Tens a certeza que queres apagar esta fotografia?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Apagar', handler: () => this.deleteImage() }
      ]
    });
    await alert.present();
  }

  deleteImage() {
    this.photos = this.photos.filter(p => p.url !== this.selectedImage);
    this.selectedImage = null;
    // Se quiseres mesmo apagar do bucket/BD:
    // await this.photosSvc.delete(path);
  }

  /* popover */
  openMenu(ev: Event) {
    this.popoverEvent = ev;
    this.isMenuOpen = true;
  }

  goToMapa() {
    this.isMenuOpen = false;
    this.router.navigate(['/mapa']);
  }
}
