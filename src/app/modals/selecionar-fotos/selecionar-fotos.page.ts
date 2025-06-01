import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService, StoredPhoto } from 'src/app/services/photo.service';

@Component({
  selector: 'app-selecionar-fotos',
  templateUrl: './selecionar-fotos.page.html',
  styleUrls: ['./selecionar-fotos.page.scss'],
  standalone: false,
})
export class SelecionarFotosPage {
  @Input() albumId!: string;
  fotos: StoredPhoto[] = [];
  selecionadas: Set<string> = new Set();

  constructor(private modalCtrl: ModalController, private photoSvc: PhotoService) {}

  async ionViewWillEnter() {
    this.fotos = await this.photoSvc.listOwned();
  }

  toggle(id: string) {
    this.selecionadas.has(id) ? this.selecionadas.delete(id) : this.selecionadas.add(id);
  }

  confirmar() {
    this.modalCtrl.dismiss([...this.selecionadas]);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
