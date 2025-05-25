import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-registo',
  templateUrl: './registo.page.html',
  styleUrls: ['./registo.page.scss'],
})
export class RegistoPage implements OnInit {

  nome: string = '';
  apelido: string = '';
  email: string = '';
  pass: string = '';

  constructor(private authService: AuthService) {}

  registar() {
  const user = {
    nome: this.nome,
    apelido: this.apelido,
    email: this.email,
    pass: this.pass
  };

  this.authService.register(user).subscribe(
    res => {
      console.log('Utilizador registado com sucesso!', res);
      // Redirecionar ou mostrar mensagem
    },
    err => {
      console.error('Erro ao registar:', err);
    }
  );
}

  ngOnInit() {
  }

}
