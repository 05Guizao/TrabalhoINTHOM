import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import {
  Camera,
  CameraResultType,
  CameraSource,
  // removi CameraPhoto pois está deprecated
} from '@capacitor/camera';

@Component({
  standalone: false,
  selector: 'app-fotografias',
  templateUrl: './fotografias.page.html',
  styleUrls: ['./fotografias.page.scss'],
})
export class FotografiasPage implements OnInit {

  
  selectedImage: string | null = null;

  photos: string[] = [
    'assets/photos/cao.jpeg',
    'assets/photos/cao2.jpeg',
    'assets/photos/escritorio.jpeg',
    'assets/photos/floresta.jpeg',
    'assets/photos/livros.jpeg',
    'assets/photos/mar.jpeg',
    'assets/photos/montanhas.jpeg',
    'assets/photos/moradia.jpeg',
    'assets/photos/rio.jpeg',
    'assets/photos/senhora.jpeg',
    'assets/photos/senhora1.jpeg',
  ];

  isMenuOpen = false;
  popoverEvent: any;

  ngOnInit() {}

  openImage(imageSrc: string) {
    this.selectedImage = imageSrc;
  }
  
  closeImage() {
    this.selectedImage = null;
  }

  async adicionarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      if ('dataUrl' in image && image.dataUrl) {
        this.photos.push(image.dataUrl);
      } else {
        console.error('Imagem selecionada não possui dataUrl:', image);
      }

      console.log('Foto selecionada:', image);
    } catch (error) {
      console.error('Erro ao aceder às fotos:', error);
    }
  }


constructor(private alertController: AlertController, private router: Router) {}

async confirmarApagar(event: Event) {
  event.stopPropagation(); // Impede que o clique feche a imagem

  const alert = await this.alertController.create({
    header: 'Apagar Fotografia',
    message: 'Tens a certeza que queres apagar esta fotografia?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'Apagar',
        handler: () => this.deleteImage()
      }
    ]
  });

  await alert.present();
}

deleteImage() {
  this.photos = this.photos.filter(p => p !== this.selectedImage);
  this.selectedImage = null;
}

openMenu(ev: Event) {
  this.popoverEvent = ev;
  this.isMenuOpen = true;
}

goToMapa() {
  this.isMenuOpen = false;
  this.router.navigate(['/mapa']);
}

}
