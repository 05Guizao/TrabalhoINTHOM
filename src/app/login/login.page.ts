import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  pass: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async iniciarSessao() {
    const email = this.email.trim();
    const password = this.pass.trim();

    if (!email || !password) {
      alert('Preencha todos os campos.');
      return;
    }

    const { data, error } = await this.authService.login(email, password);

    if (error) {
      console.error('Erro ao iniciar sessão:', error.message);
      alert('Erro: ' + error.message);
    } else {
      console.log('Login bem-sucedido:', data);
      this.router.navigate(['/tabs']); // ou outra página principal
    }
  }

  ngOnInit() {}
}
