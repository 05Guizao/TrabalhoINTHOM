import { Component } from '@angular/core';
import { Location } from '@angular/common';
import * as L from 'leaflet';

/* Corrige o caminho dos ícones para a pasta assets */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png',
});

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: false,
})
export class MapaPage {
  private map!: L.Map;

  constructor(private location: Location) {}

  /** Ciclo de vida do Ionic — só dispara quando a vista já está totalmente renderizada */
  ionViewDidEnter() {
    this.initMap();
  }

  goBack() {
    this.location.back();
  }

  private initMap() {
    /* Exemplo de coordenadas; substitui pelos teus dados */
    const fotos = [
      { lat: 38.7223, lng: -9.1393, nome: 'Foto em Lisboa' },
      { lat: 41.1579, lng: -8.6291, nome: 'Foto no Porto' },
    ];

    this.map = L.map('map', {
      zoomControl: false,       // (opcional) move o controlo de zoom
      attributionControl: true, // mantém créditos OSM
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    /* Agrupamos marcadores para ajustar o mapa a todos */
    const grupo = L.featureGroup();

    fotos.forEach((foto) => {
      L.marker([foto.lat, foto.lng]).bindPopup(foto.nome).addTo(grupo);
    });

    grupo.addTo(this.map);
    this.map.fitBounds(grupo.getBounds().pad(0.2)); // dá uma margem de 20 %
  }
}
