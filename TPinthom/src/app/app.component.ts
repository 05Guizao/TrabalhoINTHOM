import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { imageOutline, folderOutline, searchOutline } from 'ionicons/icons';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    addIcons({ imageOutline, folderOutline, searchOutline });
  }
}
