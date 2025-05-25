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

  iniciarSessao() {
  const credentials = {
    email: this.email,
    pass: this.pass
  };

  this.authService.login(credentials).subscribe(
    (res: any) => {
      console.log('Login bem-sucedido:', res);
      this.router.navigate(['/tabs']);
    },
    err => {
      console.error('Erro ao iniciar sessão:', err);
      alert('Email ou palavra-passe inválidos');
    }
  );
}

  ngOnInit() {
  }

}
