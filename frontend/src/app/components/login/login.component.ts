import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';  

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login exitoso', response);
        this.authService.setToken(response.token); 
        this.router.navigate(['/dashboard']);  
      },
      error => {
        console.error('Error en el login', error);
        this.errorMessage = 'Usuario o contraseña incorrectos.'; 
      }
    );
  }
}
