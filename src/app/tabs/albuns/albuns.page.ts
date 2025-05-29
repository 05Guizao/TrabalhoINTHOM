import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-albuns',
  templateUrl: './albuns.page.html',
  styleUrls: ['./albuns.page.scss'],
})
export class AlbunsPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  
  RouteCriarAlbum(){
    this.navCtrl.navigateForward('/criar-album');
  }

}
