import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PerfilService } from '../services/perfil.service';
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

  constructor(
    private authService: AuthService,
    private perfilService: PerfilService,
    private router: Router
  ) {}

  async registar() {
    const { data, error } = await this.authService.register(this.email, this.pass);

    if (error) {
      console.error('Erro ao registar:', error.message);
      alert('Erro ao criar conta: ' + error.message);
      return;
    }

    const { data: userData, error: userError } = await this.authService.getUser();

    if (userError || !userData.user) {
      console.error('Erro ao obter utilizador:', userError?.message);
      alert('Erro ao obter utilizador');
      return;
    }

    const userId = userData.user.id;

    // 3. Inserir dados no perfil
    const perfilError = await this.perfilService.inserirPerfil(userId, this.nome, this.apelido);

    if (perfilError) {
      console.error('Erro ao guardar perfil:', perfilError.message);
      alert('Erro ao guardar nome e apelido.');
      return;
    }

    // 4. Tudo ok
    alert('Conta criada com sucesso!');
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}
